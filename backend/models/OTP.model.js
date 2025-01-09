const mongoose = require('mongoose')

// OTP Schema
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
})
//  The OTP will expire automatically in 15 mins
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1500 }); 

// Compare Match OTP
otpSchema.methods.compareOTP = function(inputOTP){
      return   inputOTP === this.otp
}

module.exports = mongoose.model('OTP', otpSchema);