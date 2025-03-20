const express = require('express');
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const app = express();

//Express Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Root Endpoint
app.get('/', (req, res) => {
    res.send("Welcome")
})

//Other Endpoints
app.use("/api/user", require('./routes/user.Route'));
app.use('/api/order', require('./routes/order.Route'));
app.use("/api/table", require('./routes/table.Route'));
app.use('/api/payment', require('./routes/payment.Route'))

// Global Error Handler
app.use(globalErrorHandler)
module.exports = app