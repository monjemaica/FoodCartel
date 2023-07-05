const User = require("../models/userModel");
const helper = require("../helper/index");
const config = require("../config/db");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Invalid credentials");
    }
    const user = await User.getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).send("No user found");
    }

    const expectedHash = helper.authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHash) {
      return res.status(403).send("Unauthenticated user");
    }

    const salt = helper.random();
    user.authentication.sessionToken = helper.authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie(config.key.cookie, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      contact,
      street,
      city,
      barangay,
      isDeleted,
      role
    } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send("Invalid credentials");
    }

    const validUser = await User.getUserByEmail(email);

    if (validUser) {
      return res.status(400).send("Email is already exist");
    }

    const salt = helper.random();
    const user = await User.createUser({
      email,
      username,
      contact,
      address: {
        street,
        city,
        barangay,
      },
      authentication: {
        salt,
        password: helper.authentication(salt, password),
      },
      isDeleted,
      role
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
  }
};
