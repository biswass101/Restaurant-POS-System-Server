const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: {type: String, required: true},
        phone: {type: String, required: true},
        guests: {type: Number, required: true}
    },
    orderStatus: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: new Date()
    },
    bills: {
        total: {type: Number, required: true},
        tax: {type: Number, required: true},
        totalWihTax: {type: Number, required: true} 
    },
    items: []
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);