require('dotenv').config()
const mongoose = require('mongoose');
const config = require('./config');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI)
        console.log(`MongoDB Connected to: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;