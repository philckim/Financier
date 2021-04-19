const mongoose = require("mongoose");

/** User Account Schema */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
    default: "",
  },
  transaction: {
    type: Array,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
