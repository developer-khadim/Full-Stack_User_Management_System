const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Create a Schema
const userSchema = new mongoose.Schema({
            username: {
                type: String,
                unique: true,
                required: true,
                minLength: [3, 'Username must be at least 5 characters']
            },
            name: {
                firstName: {
                    type: String,
                    default: '',
                    required: true,
                },
                lastName: {
                    type: String,
                    default: ''
            } },
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
            },
            password: {
                type: String,
            },
            contact: [], // Contact 
            isApproved: { type: Boolean, },
            images: [{   // Image references
                type: mongoose.Schema.Types.ObjectId,
                ref: 'image',
            }],
            videos: [{     // Video references
                type: mongoose.Schema.Types.ObjectId,
                ref: 'picture',
            }],
            picture: String,     // Profile picture
        }, {
           virtuals: {
            fullName: {
                get() {
                    return this.name.first + ' ' + this.name.last;
                }
            }
           }
        }, 
        { timestamps: true } // Adds createdAt and updatedAt

 )

// Password hashing middleware
userSchema.pre('save', async function(next){

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

// Compare password Hook
userSchema.methods.comparePassword = async function (password) {
           return await bcrypt.compare(password, this.password)
}

// Populate Images
userSchema.methods.populateImages = async (images) => {
     return this.populate('images').execPopulate();
}

// Populate Videos
userSchema.methods.populateVideos = async (videos) => {
    return this.populate('videos').execPopulate();
}

// Export User model
module.exports = mongoose.model('User', userSchema);
