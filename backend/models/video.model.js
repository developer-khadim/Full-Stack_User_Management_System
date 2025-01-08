const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
       videoUrl: {
         type: String,
         required: true
       },
       public_id: {
        type: String,
        required: true,  // Cloudinary public_id for the video
      },
       uploadedAt: {
          type: Date()
       },
       userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',   // Referencing the User model
         required: true
       },
       discription: {
         type: String, 
         default: '',   // Optional description for the image
       }
})

videoSchema.index({ userId: 1 });

module.exports = mongoose.model('Image', videoSchema);