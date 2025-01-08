const mongoose = require('mongoose')

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
        default: Date.now(),
    }
})
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 300 seconds = 5 minutes

module.exports = mongoose.model('OTP', otpSchema);