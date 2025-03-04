const createHttpError = require('http-errors');
const Order = require('../models/order.Model')

const addOrder = async(req, res, next) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({success: true, message: 'Order added successfully', data: order});
    } catch (error) {
        next(error);
    }
}
const getOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            const error = createHttpError(404, "Order not found")
            return next(error);
        }

        res.status(200).json({success: true, data: order});

    } catch (error) {
        next(error);
    }
}
const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json({success: true, data: orders})
    } catch (error) {
        next(error);
    }
}
const updateOrder = async(req, res, next) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {orderStatus},
            {new: true}
        );

        if(!order) {
            const error = createHttpError(404, "Order not found")
            return next(error);
        }

        res.status(200).json({success: true, message: 'Order updated successfully', data: order});
    } catch (error) {
        next(error);
    }
}

module.exports = {addOrder, getOrder, getOrders, updateOrder}
