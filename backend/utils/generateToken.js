// Generate a Token
const JWT = require('jsonwebtoken');

module.exports.generateToken = (user) => {
     return JWT.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET, 
        {expiresIn: '1d'})
}