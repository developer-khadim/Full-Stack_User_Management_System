const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { body } = require('express-validator')


router.post('/register', 
    [
        body('username')
           .isLength({min: 3})
           .withMessage("Username must be at least 5 characters long"),
        body('email')
           .isEmail()
           .withMessage("Invalid email address"),
        body('password')
           .isLength({min: 6})
           .withMessage("Password must be at least 6 characters long"),
    ],
     userController.registerUser

)

module.exports = router