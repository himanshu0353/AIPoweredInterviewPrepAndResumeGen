require('dotenv').config();
const { connect } = require('mongoose');
const app = require('./Backen/app');
const connectToDB = require('./Backen/config/database');
const invokeGenAi = require('./Backen/services/ai.service');

connectToDB();
invokeGenAi;
app.listen(3000, () => {
    console.log(`server is running on port 3000`);
})
