// //****** Requiring Packeges ********/
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const userRouter = require('./routes/user.router')
const adminRouter = require('./routes/admin.router')
const authRouter = require('./routes/auth.router')
const imageModel = require('./models/image.model')
const { connectDB } = require('./config/dbConnection')
const passport = require('./config/passportConfig'); // Adjust the path as necessary


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
app.use(passport.initialize());

const adminModel = require('./models/admin.model')


app.get('/admin', async (req, res) => {
      
    const add = await adminModel.create(
        {
            cnic: "00000-1234567-8", // String with the correct CNIC pattern
            name: {
                firstName: "Khadim",
                lastName: "Ali"
            },
            email: "khadim.ali@gmail.com", // Valid email address
            password: "khadim123",  // khadim123
            contact: ["1234567890", "0987654321"], // Array of contact numbers (strings)
            isAdmin: true, // Boolean
        
        }
    )
      res.status(200).send('Admin created successfully')

})


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
app.use('/admin', adminRouter)
app.use(authRouter)

// Export the app
module.exports = app;
