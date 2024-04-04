const express = require("express");
const router = express.Router();
const {
  signup,
  logout,
  handleMembership,
  handleAdminStatus,
} = require("../controllers/authController");
const {
  loginValidationRules,
  signupValidationRules,
} = require("../middleware/validation");
const passport = require("passport");
const {
  ensureAuthenticated,
  ensureGuestUser,
  isNotAdmin,
  isNotMember,
} = require("../middleware/authMiddleware");
// Signup Route

router
  .route("/signup")
  .get(ensureGuestUser, (req, res) => {
    const locals = {
      title: "♠️ Sign Up! ♣️",
    };
    res.render("signup", { locals, errors: {} });
  })
  .post(ensureGuestUser, signupValidationRules(), signup);

// Login Route

router
  .route("/login")
  .get(ensureGuestUser, (req, res) => {
    let errors = {};

    if (req.session.messages) {
      errors = {
        authError: req.session.messages[req.session.messages.length - 1],
      };

      req.session.messages = [];
    }

    const locals = {
      title: "♠️ Login ♣️",
    };
    res.render("login", { locals, errors });
  })
  .post(
    ensureGuestUser,
    loginValidationRules(),
    passport.authenticate("local", {
      successRedirect: "/board",
      failureRedirect: "/auth/login",
      failureMessage: true,
    })
  );

// SPECIAL PRIVELEGES ROUTES

// GET MEMBERSHIP

router
  .route("/enlist")
  .get(ensureAuthenticated, isNotMember, isNotAdmin, (req, res) => {
    const isLoggedIn = req.isAuthenticated();

    const locals = {
      title: "Get Membership 😎",
      isLoggedIn,
    };

    res.render("enlist", { locals, errors: {} });
  })
  .put(ensureAuthenticated, handleMembership);

// GET ADMIN STATUS

router
  .route("/admin")
  .get(ensureAuthenticated, isNotAdmin, (req, res) => {
    const isLoggedIn = req.isAuthenticated();

    const locals = {
      title: "Get Admin Status 😎",
      isLoggedIn,
    };

    res.render("admin", { locals, errors: {} });
  })
  .put(ensureAuthenticated, handleAdminStatus);

/* ------------------------------------ . ----------------------------------- */
router.route("/logout").post(logout);
module.exports = router;
