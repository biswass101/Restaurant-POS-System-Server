const createHttpError = require("http-errors");
const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name, phone, email, password: hashedPassword, role };
    const newUser = User(user);
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "New User Created", data: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      const error = createHttpError(401, "Invalid credentials");
      return next(error);
    }

    const isMatched = await bcrypt.compare(password, isUserPresent.password);
    if (!isMatched) {
      const error = createHttpError(401, "Invalid credentials");
      return next(error);
    }

    const accessToken = jwt.sign(
      { _id: isUserPresent._id },
      config.accessTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, //expires in miliseconds
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      sucess: true,
      message: "User login successfully",
      data: isUserPresent,
    });
  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {

    //remove coockie
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false
    });
    res.status(200).json({success: true, message: "User logout successfully"})
    
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, getUserData, logout };
