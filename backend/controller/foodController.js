const Food = require("../models/foodModel");

exports.homepage = async (req, res) => {
  try {
    const foods = await Food.getFoods();
    res.render("home", { req, foods });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.cartitempage = async (req, res) => {
  try {
    res.render("cartitems", { req });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.getFoods();

    return res.status(200).json(foods);
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.create = async (req, res) => {
  try {
    const { name, stocks, price, img, isDeleted } = req.body;

    if (!req.body) {
      return res.status(400).send("No Data Found");
    }

    const validFood = await Food.getFoodByName(name);
    if (validFood) {
      return res.status(400).send("Food already exists");
    }

    const food = await Food.createFood({ name, stocks, price, img, isDeleted });

    res
      .status(200)
      .json({ msg: "Successfully Food Created", data: food, redirect: "/" });
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
