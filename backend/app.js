//****** Requiring Packeges ********/
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
    origin: "http://localhost:5173",
    methods: "GET, POST, PATCH, DELETE",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();
connectDB(); // Connect to database

app.get('/otp', (req, res) => {
    try {
   res.status(200).send({ OTP : generateOTP()})
    } catch(err){
        res.status(500).send({error : error.message})
    }
})

// Routes
app.use('/user', userRouter)

// Export the app
module.exports = app;