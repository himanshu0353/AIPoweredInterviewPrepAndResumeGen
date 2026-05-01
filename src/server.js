require('dotenv').config();
const { connect } = require('mongoose');
const app = require('./app');
const connectToDB = require('./config/database');

async function startServer() {
    try {
        // Connect to database before starting server
        await connectToDB();
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();