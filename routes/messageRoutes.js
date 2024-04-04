const express = require("express");
const router = express.Router();

const {
  createMessage,
  deleteMessage,
} = require("../controllers/messagesController");

const {
  isAdmin,
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

router.route("/create").post(ensureAuthenticated, createMessage);

router
  .route("/delete/:messageId")
  .delete(ensureAuthenticated, isAdmin, deleteMessage);

module.exports = router;
