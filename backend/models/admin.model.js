const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


  const adminSchema = new mongoose.Schema({
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
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
        contact: [],
        isAdmin: true,
        picture: String,
  });

// Password hashing middleware
adminSchema.pre('save', async (next) => {

     // Skip hashing if the password hasn't been modified
     if(!this.isModified('password')) return next();

     // Hash the Password
      bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt)) // Hash password
      .then(hash => { 
        this.password = hash; // Store the hash password
        return next();
      })
      .catch(error => next(error));
})

//Compare password Hook
adminSchema.methods.comparePassword = (password) => {
     return bcrypt.compare(password, this.password)
}

// Export Admin model
module.exports = mongoose.model('Admin', adminSchema)

