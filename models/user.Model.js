const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Email must be in valid format",
      },
    },

    phone: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          return /\d{10}/.test(value);
        },
        message: "Phone number must be in 11-digit format",
      },
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
