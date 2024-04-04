const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/authMiddleware");
const {
  getMessages,
  createMessage,
  deleteMessage,
} = require("../controllers/messagesController");

// Chat Board Routes

router.route("/").get(getMessages);

module.exports = router;
