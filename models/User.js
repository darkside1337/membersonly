const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    required: true,
  },
  membershipStatus: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 3,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
