//********** User Controller  */
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
            return res.status(404).json({ message: "Email already exists!"})
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

// Login with Google Account
module.exports.googleLogin = async (profile, cb) => {
    try {
        // check is the user in Database
       const chk_user = await userModel.findOne({ email: profile.emails[0].value })
     
       if(chk_user){ 
           const token = generateToken(chk_user)
           cb(null, {user: chk_user, token})  // Return the user
           return
       } else {
            const user = await userModel.create({
             username: profile.displayName,
             name: {
               firstName: profile.name.givenName,
               lastName: profile.name.familyName ? profile.name.familyName : "" 
             },
             email: profile.emails[0].value,
             picture: profile.photos[0].value,
             password: "", // No password for Google users
        
       });
       const token = generateToken(user) 
          cb(null , {user, token})
          return
       }
    } catch(error) {
        cb(error);
    }
}

// User Login
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
          return res.status(409).json({ Error: "User not found!" });

        } else {
            // Generate Token
            let token =  generateToken(existedUser);

            res.status(200).cookie('token', token, { httpOnly: true, secure: true })
            .json({ 
                message: "User logined Successfully", 
                user: {...existedUser.toObject(), password: undefined},
                token
            })
        }

            res.status(200)
            .cookie('token', token, { httpOnly: true, secure: true })
            .json({message: "User logined Successfully", user: { ...existedUser.toObject(), password: undefined }, 
            token
             })

    }   catch(error) {
       return  res.status(500).json({ Error: error.message });
    }
}


// Send OTP to verify Email
module.exports.sendOTP = async (req, res) => {
           
    let error = validationResult(req);
    if(!error.isEmpty())  return res.status(500).json({ Error: error.message });

    try {

    let { username, email } = req.body
    const otp = generateOTP()

    const newOTP = await otpModel.findOneAndUpdate(
         { email: email }, //filter
         {  
            otp,  
            username,
            isVerified: false,
            createdAt: new Date()
         },
         {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
         }
    )
    
    const mail = sendMail(email, username, otp)
    res.status(200).json({ otp: newOTP, message: "Email sent successfully"})

    } catch(error) {
      res.status(500).json({ Error: error.message, message: "Email coundn't send Successfully, Try agian"})
    }
}


module.exports.otpVarification = async (req, res) => {
    
     let { email, otp } = req.body

     try{
        // Find OTP with Email
        const isOTPMatch = await otpModel.findOne({ email } )
        // Match the OTP
        if(!isOTPMatch || !isOTPMatch.compareOTP(otp)){
            res.status(404).json({ Error: "OTP doesn't Matched! Resend otp agian!!"})
        } else {

            isOTPMatch.isVerified= true;
            await isOTPMatch.save();

            return res.status(200).json({ message: "OTP is verified successfully!" })
        }
     } catch(error) {
        return res.status(500).json({ error: "An error occurred. Please try again!" });
     }
}

module.exports.getProfile = async (req, res, next) => {
    
        res.status(200).json({user: req.user})
}