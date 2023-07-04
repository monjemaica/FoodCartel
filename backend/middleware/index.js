const config = require('../config/db');
const user = require('../models/userModel');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies[config.key.cookie];

    if (!sessionToken) {
      return res.status(403).send("Unauthenticated user");
    }

    const existingUser = await user.getUserBySessionToken(sessionToken);

    if (existingUser) {
      return res.status(403).send("Unauthenticated user");
    }

    const data = {...req, identify:existingUser};
    data;
    // merge(req, { identify: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
