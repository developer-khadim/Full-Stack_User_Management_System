const userModel = require('../models/user.model')
const { generateToken } = require('../utils/generateToken')
const { validationResult } = require('express-validator')


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
           .json({ user: {...createdUser.toObject(), password: undefined}, token})
        }

    } catch(error) {

        if(error.code === 11000){
            return res.status(409).send({ message: "The username already exists" });
        }
        res.status(500).json({ Error: error.message});
        console.error(error);
    }
}