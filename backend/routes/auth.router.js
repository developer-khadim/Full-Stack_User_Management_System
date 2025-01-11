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
            const token = req.user
            await req.logout(() => {
              console.log('logged out')
            })
            
         }
        ),

router.get('/auth/success', (req, res) => {
        res.send({token: req.query?.token})
})

router.get('/auth/logout', (req, res) => {
       // use this route for logout to user 
})
module.exports = router

//http://localhost:5173/Admin_dashboar