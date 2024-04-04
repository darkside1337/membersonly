const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLenght: 3,
      maxLength: 50,
      required: true,
    },
    message: {
      type: String,
      minLenght: 3,
      maxLength: 300,
      required: true,
    },
    sentBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
