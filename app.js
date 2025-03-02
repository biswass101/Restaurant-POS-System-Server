const express = require('express');
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const app = express();

//Express Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Root Endpoint
app.get('/', (req, res) => {
    res.send("Welcome")
})

//Other Endpoints
app.use("/api/user", require('./routes/user.Route'))
app.use('/api/order', require('./routes/order.Route'))

// Global Error Handler
app.use(globalErrorHandler)
module.exports = app