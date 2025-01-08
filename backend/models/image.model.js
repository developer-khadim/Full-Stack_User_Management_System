const mongoose = require('mongoose');

// Create User Schema
const imageSchema = new mongoose.Schema({
       imageUrl: {
         type: String,
         required: true
       },
       public_Id: {
        type: String,
        required: true,  // Cloudinary public id for the Image
      },
       uploadedAt: {
          type: Date,
          default: Date.now()
       },
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'users',   // Referencing the User model
         required: true
       },
       discription: {
         type: String, 
         default: '',   // Optional description for the image
       }
})

// imageSchema.index({ userId: 1 });

module.exports = mongoose.model('Image', imageSchema);