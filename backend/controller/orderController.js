const Order = require("../models/orderModel");
const moment = require("moment");

exports.create = async (req, res) => {
    try {
        const {user_id, items, total_amount, total_qty, status} = req.body;

        if(!req.body){
            return res.status(400).send("No data found");
        }

        const order = await Order.createOrder({user_id, items, total_amount, total_qty, status});

        res.status(200).json({msg:"Successfully Order Created", data:order, redirect:"/"});
    } catch (error) {
        console.log(error);
        return;
    }
}

exports.getOrders = async (req, res) => {
    try {
       const orders = await Order.getOrders();
        console.log(orders);
       res.render("orders", {req, orders, moment})
    } catch (error) {
        console.log(error);
        return;
    }
}

exports.getUserOrders= async (req, res) => {
    try {

        if(!req.params){
            return res.status(400).send("No params found");
        }

       const orders = await Order.getOrderByUserId(req.params);

       res.render("orders", {req, orders, moment})

    } catch (error) {
        console.log(error);
        return;
    }
}

exports.update = async (req,res) => {
    try {
        const {id} = req.params;
        const orderData= req.body;

        if(!orderData){
            return res.status(400).send("Record not found");
        }

        const updateOrder = await Order.updateOrderStatus(id, orderData);

        return res.status(200).json(updateOrder);
    } catch (error) {
        console.log(error)
        return;
    }
}