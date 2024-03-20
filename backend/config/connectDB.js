const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/mernstack';
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectDatabase;
