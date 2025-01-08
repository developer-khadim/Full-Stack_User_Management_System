const userModel = require('../models/user.model')
const JWT = require('jsonwebtoken')

// User Authorization
module.exports.userAuth = (req, res, next) => {
    
    // Decode the cookies
    const token = req.cookies.token || req.headers['authorization']?.replace(("Bearer", ""))
    if(!token) {
        res.status(401).json({ Error: "You need to login first!"})
    }

    try {
        // Decode the Token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = userModel.findOne({ _id: decoded._id}).select('-password');
        if(!user) return res.status(401).json({ Error: "User not found! "})
            req.user = user;
             next();
            
    } catch(error){
        res.status(500).json({ Error: "Internal Server Error"})
    }
}