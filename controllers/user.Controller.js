const createHttpError = require("http-errors");
const User = require("../models/user.Model");
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "All fields are required");
      next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(400, "User already exists");
      next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10)

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

const login = async (req, res, next) => {};

module.exports = { register, login };
