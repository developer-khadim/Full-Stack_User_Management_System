//******** Database Connecdtion Configuration  *******/
const mongoose = require('mongoose');

module.exports.connectDB = () => {
    //  Connect to the database
     mongoose.connect(process.env.dbConnection)
    .then(() => {
      console.log(`MongoDB connected!! DB host: ${mongoose.connection.host}`);
    }).catch((error) => {
       console.log("MONGODB connection FAILED: " , error)
    })
 }
