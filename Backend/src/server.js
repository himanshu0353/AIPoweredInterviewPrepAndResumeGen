require('dotenv').config();
const { connect } = require('mongoose');
const app = require('./app');
const connectToDB = require('./config/database');
const invokeGenAi = require('./services/ai.service');

connectToDB();
invokeGenAi;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})