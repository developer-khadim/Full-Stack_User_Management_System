const adminModel = require('../models/admin.model')
const { validationResult } = require('express-validator')
const { generateToken } = require('../utils/generateToken')


// Admin Login
module.exports.adminLogin = async (req, res) => {
      
    const error  = validationResult(req)
    if(!error.isEmpty())  return res.status(400).json({ Error: "Error:"+ error.array()})

    try{
        
        let { cnic, password } = req.body

        const existedAdmin = await adminModel.findOne({ cnic })
        console.log(existedAdmin)
        if(!existedAdmin || !( existedAdmin.comparePassword(password))){
            res.status(409).json({ Error: "Admin not found!" });
        } else { 
           
            const token = generateToken(existedAdmin)
            res.status(200)
            .cookie('token', token, { httpOnly: true, secure: true })
            .json({message: "Admin logined Successfully", user: { ...existedAdmin.toObject(), password: undefined }, 
            token
             })
        }
    } catch(error){

        return res.status(500).json({ Error: error.message });
    }
}

// getAdminProfile
module.exports.getAdminProfile = async (req, res) => {

     res.status(200).json(req.admin)

    }


