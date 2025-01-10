const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/user.controller')


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }
    ));

// Callback Route
router.get("/auth/google/callback", 
          passport.authenticate('google', { session: false }),
          async (req, res) => {
            const user = req.user
            res.status(200).send(user)
         }
        ),
          
module.exports = router