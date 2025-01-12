const express = require('express')
const router  = express.Router()
const { body } = require('express-validator')
const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/authMiddleware')


// Admin Login Route
router.post('/login',
    [
        body('cnic')
          .isString()
          .withMessage("Please provide a valid CNIC (e.g., 12345-6789012-3"),
        body('password')
        .isLength({ min: 6})
    ],

    adminController.adminLogin
     
)

// Get Admin Profile
router.get('/profile', authMiddleware.adminAuth, adminController.getAdminProfile)

module.exports = router