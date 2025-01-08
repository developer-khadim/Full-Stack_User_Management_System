const userModel = require('../models/user.model')
const { generateToken } = require('../utils/generateToken')
const { validationResult } = require('express-validator')
const { generateOTP } = require('../utils/generateOTP')
const otpModel = require('../models/OTP.model')
const { isEmail } = require('validator')
const { sendMail } = require('../controllers/email.controller')


// Register User
module.exports.registerUser = async (req, res) => {
    
    // Validate the form
    const error = validationResult(req)
    if(!error.isEmpty())  return res.status(400).json({ Error: "Error:"+ error.array()})

    try {
        // Destructure the body
        let { firstName, lastName, email, contact, username, password } = req.body;

        // Find is email Already exists
        let user = await userModel.findOne({ email })

        if(user){
            res.status(404).json({ message: "Email already exists!"})
        } else {

        // Create the new user
          let createdUser = await userModel.create({
             name: {
                firstName: firstName,
                lastName: lastName
             },
              contact: [contact],
              email: email,
              username: username,
              password: password,
          })
          //  Generate a token
           let token = generateToken(createdUser);
           res
           .status(201)
           .cookie('token', token, { httpOnly: true, secure: true })
           .json({ user: {...createdUser.toObject(), password: undefined}, token, message: "User created successfully"})
        }

    } catch(error) {

        if(error.code === 11000){
            return res.status(409).send({ message: "The username already exists" });
        }
        res.status(500).json({ Error: error.message});
    }
}

module.exports.userLogin = async (req, res) => {
    
    let error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(error.status).json({ Error: error.message });
    } 
    try {
        // Destructure the body
        let { username_email, password } = req.body;

        // Check isEmail
        const isInputEmail = isEmail(username_email);
        let existedUser = await userModel.findOne(
            isInputEmail ? 
                  { email: username_email } : { username: username_email }
        )
        
        if(!existedUser || !(await existedUser.comparePassword(password))){
           res.status(409).json({ Error: "User not found!" });

        } else {
            // Generate Token
            let token =  generateToken(existedUser);
            res.status(200)
            .cookie('token', token, { httpOnly: true, secure: true })
            .json({message: "User logined Successfully", user: { ...existedUser.toObject(), password: undefined }, 
            token
             })
    }
    } catch(error) {
        res.status(500).json({ Error: error.message });
    }
}

module.exports.sendOTP = async (req, res) => {
           
    let error = validationResult(req);
    if(!error.isEmpty())  return res.status(500).json({ Error: error.message });

    try {

    let { username, email } = req.body
    const otp = generateOTP()
    const newOTP = await otpModel.create({
        otp,
        username,
        email,
    })
    
    const mail = sendMail(email, username, otp)
    res.status(200).json({ message: mail, newOTP})

    } catch(error) {
      res.status(500).json({ Error: error.message})
    }
}

module.exports.otp = async(req, res) => {
    
     let { otp } = req.body

     try{

        const isOTPMatch = await otpModel.findOne({ otp } )
        if(!isOTPMatch){
            res.status(404).json({ Error: "Resend otp agian!!"})
        } else {

            isOTPMatch.isVerified= true;
            await isOTPMatch.save();

            return res.status(200).json({ message: "OTP is verified successfully!" })
        }
     } catch(error) {
        return res.status(500).json({ error: "An error occurred. Please try again!" });
     }
}