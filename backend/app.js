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



app.get('/image', (req, res) => {
    
    
    imageModel.create({
        imageUrl: "kaif",
        public_Id: "Sasdoihi",
        userId: "677dbcb59f48b8e6ac4764db"
    })

    res.status(200);
})

app.get('/front', (req, res) => {
    res.status(200).send({message: "I am sending you data Khaidim"})
})

// Routes
app.use('/user', userRouter)

// Export the app
module.exports = app;