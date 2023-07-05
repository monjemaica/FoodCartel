const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);

const getUsers = () => UserModel.find();

const getUserById = (id) => UserModel.findById(id);

const getUserByEmail = (email) => UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken) => {
  return UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
};


const createUser = (values) => {
  return  new UserModel(values).save().then((user) => user.toObject);
};

const updateUserById = (id, values) => {
  return UserModel.findByIdAndUpdate(id, values, { new: true });
};
const deleteUserById = (id, values) => {
  return UserModel.findByIdAndUpdate(id, values, { new: true });
};

// const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id });

module.exports = {
  UserModel,
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
};
