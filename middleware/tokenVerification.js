const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.Model");

const isVerifiedUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if(!accessToken) { 
            const error = createHttpError(401, "Please Provide token!")
            return next(error);
         }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret)
        const user = await User.findById(decodeToken._id)
        if(!user) {
            const error = createHttpError(401, "User Not Exist!")
            return next(error);
        }

        req.user = user;
        next()

    } catch (error) {
        const err = createHttpError(401, "Invalid token!")
        next(err)
    }
}

module.exports = {isVerifiedUser};