const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoURI = 'mongodb+srv://pakman4990:pakman4990@cluster0.6tnmxxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectDatabase;
