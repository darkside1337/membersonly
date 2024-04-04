const express = require("express");
const { ensureGuestUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(ensureGuestUser, (req, res) => {

  const isLoggedIn = req.isAuthenticated();


  const locals = {
    title: "🃏 Elite Club ♣️",
    isLoggedIn
  };
  res.render("homepage", { locals });
});

module.exports = router;
