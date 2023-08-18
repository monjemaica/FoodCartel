const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id:{
        type: String,
        require: true
    },
    items:{
        type: Array,
        require: true
    },
    total_amount:{
        type: Number,
        require: true
    },
    total_qty:{
        type : Number, 
        require: true
    },
    status:{
        type : String, 
        require: true
    },
    date_created:{
        type : Date, 
        default: Date.now
    }
})

const OrderModel = mongoose.model("Order", OrderSchema);

const getOrders = () => OrderModel.find().sort({date_created:-1});

const getOrder = (id) => OrderModel.aggregate([
    {
        $match:{
            id
        }
    },
    {
        $lookup:{
            from:"Users",
            localField: "user_id",
            foreignField: "_id",
            as: "order_details"
        }
    }
])

const getOrderById = (id) => OrderModel.findById(id);

const getOrderByUserId = (id) => OrderModel.find(id);

const getPendingOrders= (values) => {
    return OrderModel.find(values);
}

const createOrder = (values) => {
    return new OrderModel(values).save().then((order) => order.toObject);
}

const updateOrderStatus = (id, values) => {
    return OrderModel.findByIdAndUpdate(id, values, {new: true});
}


module.exports ={
    getOrders,
    getOrder,
    getOrderById,
    getOrderByUserId,
    getPendingOrders,
    createOrder,
    updateOrderStatus
}


