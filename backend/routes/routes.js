const express = require('express');
const User = require('../models/UserModel');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const path = require('path');


// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'duv8beveo',
    api_key: '645289865995663',
    api_secret: 'jpcm0Ci7nSbKL_gDttIzSJSNORo'
});


// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
    }
});

// Create the multer upload instance
const upload = multer({ storage: storage });

// CORS Configuration
router.use(cors({
    origin: 'https://mern-app-frontend-one.vercel.app',
    methods:['POST', 'GET'],
    credentials: true
}));

// // Route for '/'
router.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack API');
}
);


// Route for '/login'
router.post('/login', async (req, res) => {
    try {
        // Find a user with the email and password from the request body
        const user = await User.findOne({ email: req.body.email, password: req.body.password });

        // If the user is found, respond with the user object
        if (user) {
            res.send(user);
        } else {
            // If the user is not found, respond with an error message
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Route for '/register'
router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {

        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);

        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            const profilePictureUrl = result.secure_url; // Get the secure URL of the uploaded image

            // Create a new user object with data from the request body
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: profilePictureUrl // Assign the profile picture URL
            });

            // Save the user to the database
            await newUser.save();
            console.log('User' + newUser + 'registered successfully');

            // Respond with a success message
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            // Respond with an error message if no file is uploaded
            res.status(400).json({ error: 'No profile picture uploaded' });
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

// Route for '/users'
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
