const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }
    ));

// Callback Route
router.get("/auth/google/callback", 
          passport.authenticate('google', { session: false }),
          async (req, res) => {
            const {user, token} = req.user

            res.redirect(`${process.env.Origin  }/google_token?user=${encodeURIComponent(user)}
            // &token=${encodeURIComponent(token)}`)
         }
        );

module.exports = router

//http://localhost:5173/User_dashboard