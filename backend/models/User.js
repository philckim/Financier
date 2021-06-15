const mongoose = require("mongoose");

/** User Account Schema */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
