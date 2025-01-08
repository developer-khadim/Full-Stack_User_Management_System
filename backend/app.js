//****** Requiring Packeges ********/
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const userRouter = require('./routes/user.router')
const imageModel = require('./models/image.model')

// Cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

// for test
app.get('/image', (req, res) => {
    
    
    imageModel.create({
        imageUrl: "kaif",
        public_Id: "Sasdoihi",
        userId: "677dbcb59f48b8e6ac4764db"
    })

    res.status(200);
})
// Routes
app.use('/user', userRouter)

// Export the app
module.exports = app;