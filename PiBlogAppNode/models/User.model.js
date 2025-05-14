const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["author", "customer"],
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
