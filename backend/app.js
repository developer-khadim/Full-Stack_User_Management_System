// //****** Requiring Packeges ********/
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const app = express();
// const userRouter = require('./routes/user.router')
// const imageModel = require('./models/image.model')
// const { connectDB } = require('./config/dbConnection');

// // Cors configuration
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PATCH, DELETE",
//     credentials: true
// }))
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')));
// require('dotenv').config();
// connectDB(); // Connect to database



// app.get('/image', (req, res) => {
    
    
//     imageModel.create({
//         imageUrl: "kaif",
//         public_Id: "Sasdoihi",
//         userId: "677dbcb59f48b8e6ac4764db"
//     })

//     res.status(200);
// })

// // Routes
// app.use('/user', userRouter)

// // Export the app
// module.exports = app;


//****** Requiring Packages ********/
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const userRouter = require('./routes/user.router')
const imageModel = require('./models/image.model')
const { connectDB } = require('./config/dbConnection');

// Cors configuration
app.use(cors({
  origin: 'http://localhost:5173',  // React app URL (make sure it's correct)
  methods: 'GET, POST, PATCH, DELETE',  // Allowed methods
  credentials: true  // Allow cookies to be sent along with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();
connectDB(); // Connect to the database

// Sample image route (adjust as per requirement)
app.get('/image', (req, res) => {
  imageModel.create({
    imageUrl: "kaif",
    public_Id: "Sasdoihi",
    userId: "677dbcb59f48b8e6ac4764db"
  }).then(() => {
    res.status(200).send('Image Created');
  }).catch(err => {
    res.status(500).send('Error creating image');
  });
});

// Routes
app.use('/user', userRouter);

// Handling Preflight (OPTIONS) requests (for CORS)
app.options('*', cors()); // Ensure the server handles the preflight requests

// Export the app
module.exports = app;
