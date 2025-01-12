const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


  const adminSchema = new mongoose.Schema({
        cnic: {
           type: String,
           required: true,
           match: [/^\d{5}-\d{7}-\d{1}$/, 'Please provide a valid CNIC (e.g., 12345-6789012-3)']
        },
        name: {
          firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
        } },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: true,
        },
        isAdmin: {
          type: Boolean,
          default: true,

        },
        picture: String,
  });

// Password hashing middleware
adminSchema.pre('save', async function (next) {

     // Skip hashing if the password hasn't been modified
            if(!this.isModified('password')) return next();
            
            // Hash the Password
           await bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(this.password, salt)) // Hash password
            .then(hash => {
                this.password = hash; // Store the hash password
                next();
            })
            .catch(error => next(error));
})

//Compare password Hook
adminSchema.methods.comparePassword = async function (password){
     return await bcrypt.compare(password, this.password)
}

// Export Admin model
module.exports = mongoose.model('Admin', adminSchema)

