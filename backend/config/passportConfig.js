//******** Configuring the Passport   *******/
const passport = require('passport');   
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userController = require('../controllers/user.controller')
require('dotenv').config();

// Make a Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    callbackURL: process.env.CallbackURL,
    
    
  },
  async function(accessToken, refreshToken, profile, cb) {
      await  userController.googleLogin(profile, cb)
    // cb(null, profile)
  }
))
// Export the Passport
module.exports = passport;