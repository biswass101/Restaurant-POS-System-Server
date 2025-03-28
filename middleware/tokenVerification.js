const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.Model");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    // console.log("Here");
    if (!accessToken) {
      return next(createHttpError(401, "Please Provide token!"));
    }

    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);
    const user = await User.findById(decodeToken._id);
    if (!user) {
      return next(createHttpError(401, "User Not Exist!"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid token!"));
  }
};

module.exports = { isVerifiedUser };
