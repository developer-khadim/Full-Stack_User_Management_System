//******** Database Connecdtion Configuration  *******/
const mongoose = require('mongoose');

module.exports.connectDB = async () => {

   try{
    const connectionInstance = await  mongoose.connect(process.env.dbConnection)
    console.log(`\nMongoDB connected!! DB host: ${connectionInstance.connection.host}`)

   } catch(error){
     console.log("MongoDB connection failed: " + error);

   }
  }
