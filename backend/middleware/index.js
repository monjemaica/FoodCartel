const config = require("../config/db");
const user = require("../models/userModel");
const _ = require("lodash");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies[config.key.cookie];

    if (!sessionToken) {
      return  res.render('login',{req})
    }

    const existingUser = await user.getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).send("Unauthenticated user");
    }

    _.merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const checkRole = _.get(req, "identity.role");

    if (!checkRole) {
      return res.sendStatus(400);
    }

    if (
      checkRole.includes("1301") ||
      checkRole.includes("1302") ||
      checkRole.includes("1303")
    ) {
      // 1301 - admin, 1302 - customer, 1303 - courier
      return next();
    }

    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const checkRole = _.get(req, "identity.role");
    console.log(checkRole);
    if (!checkRole) {
      return res.sendStatus(400);
    }

    if (checkRole.includes("1301")) {
      // 1301 - admin, 1302 - customer, 1303 - courier
      return next();
    }

    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

exports.isCourier = async (req, res, next) => {
  try {
    const checkRole = _.get(req, "identity.role");

    if (!checkRole) {
      return res.sendStatus(400);
    }

    if (checkRole.includes("1302")) {
      // 1301 - admin, 1302 - user, 1303 - courier
      return next();
    }

    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
