const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { body, check } = require('express-validator')


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

router.post('/login', 
      [
         body('username_email')
           .isString()
           .notEmpty(),
         body('password')
             .isLength({min: 6}
         
         )
      ],
      userController.userLogin
   )

router.post('/send-mail', 
         [
            body('username')
                .isString()
                .notEmpty(),
            body('email')
                .isEmail()
                .withMessage('Please enter your email address')
         ],
         userController.sendOTP
)
module.exports = router