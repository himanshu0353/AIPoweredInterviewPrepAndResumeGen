const mongoose = require('mongoose');

async function connectToDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log('✅ Connected to database successfully');
        return true;
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
        throw error; // Re-throw so server startup fails
    }
}

module.exports = connectToDB; 