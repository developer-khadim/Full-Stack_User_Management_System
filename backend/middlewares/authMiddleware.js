const userModel = require('../models/user.model')
const adminModel = require('../models/admin.model');
const JWT = require('jsonwebtoken');


// User Authorization
module.exports.userAuth = async (req, res, next) => {
    
    // Decode the cookies
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ Error: "You need to log in first!"})
    }

    try {
        // Decode the Token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        if(!user) {
            return res.status(401).json({ Error: "User not found! "})
        }
           req.user = user

             next();
    } catch(error){
        res.status(500).json({ Error: "Internal Server Error"})
    }
}


// Admin Authorization
module.exports.adminAuth = async (req, res, next) => {
    
    // Decode the cookies
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ Error: "You need to login first!"})
    }

    try {
        // Decode the Token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded.id).select('-password');

        if(!admin) {
            return res.status(401).json({ Error: "Admin not found! "})
        }
           req.admin = admin
             next();
    } catch(error){
       return res.status(500).json({ Error: "Internal Server Error"})
    }
}