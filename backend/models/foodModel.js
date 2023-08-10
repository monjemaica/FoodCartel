const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    stocks:{
        type: Number,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    img:{
        type:String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

const FoodModel = mongoose.model("Food", FoodSchema);

const getFoods = () => FoodModel.find();

const getFoodById = (id) => FoodModel.findById(id);

const getFoodByName = (name) => FoodModel.findOne({ name });

const createFood = (values) => {
  return  new FoodModel(values).save().then((food) => food);
};

const updateFoodById = (id, values) => {
  return FoodModel.findByIdAndUpdate(id, values, { new: true });
};
const deleteFoodById = (id, values) => {
  return FoodModel.findByIdAndUpdate(id, values, { new: true });
};

module.exports = {
    getFoods,
    getFoodById,
    getFoodByName,
    createFood,
    updateFoodById,
    deleteFoodById
}