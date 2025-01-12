const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator')


// Register User Route
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
// User Login Route
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

   // Send Email Route
router.post('/send-mail', 
         [
            body('username')
                .isString(),
            body('email')
                .isEmail()
                .withMessage('Please enter your email address')
         ],
         userController.sendOTP
);
// Verify OTP Route
router.post('/verify-otp',
         [
            body('email')
                 .isEmail()
                 .withMessage('Please enter your email address'),
            body('otp')
                  .notEmpty()
                  .withMessage('Please fill the OTP')
         ],

         userController.otpVarification
)

// getProfile Route
router.get('/profile', authMiddleware.userAuth, userController.getProfile)

         
module.exports = router