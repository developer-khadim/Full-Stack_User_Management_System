//****** Index or Server ********/
const app = require('./app');

    // Start the Server
    app.listen(process.env.PORT || 5000, (res) => {
    try {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}` );
    } catch(error){
        res.status(500).send("Internal Server Error!!!")
    }
     })