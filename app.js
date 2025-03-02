const express = require('express');
const createHttpError = require('http-errors');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const app = express();

//Root Endpoint
app.get('/', (req, res) => {
    res.send("Welcome")
})

// Global Error Handler
app.use(globalErrorHandler)
module.exports = app