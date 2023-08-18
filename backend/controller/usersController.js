const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).send("User ID not found");
    }

    const user = await User.getUserById(id);

    return res.status(200).json(user);

  } catch (error) {
    console.log(error);
    return;
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (!userData) {
      return res.status(400).send("Record not found");
    }

    const updatedUser = await User.updateUserById(id, userData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const checkUser = await User.getUserById(id)

    if (!checkUser) {
      return res.status(400).send("User is not found");
    }

    const updatedUser = await User.deleteUserById(id, {isDeleted:true});

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
