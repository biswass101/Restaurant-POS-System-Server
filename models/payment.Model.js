const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    trxID: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);