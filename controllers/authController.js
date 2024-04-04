const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
//

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const locals = {
    title: "♠️ Sign Up! ♣️",
  };

  // error validation

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // errors example: err.path: err.msg
    const transformedErrors = errors.errors.reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
    console.log(transformedErrors);
    return res.render("signup", { locals, errors: transformedErrors });
  }

  // check if user exists

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const errors = { userCheck: "User Already exists!" };
    return res.status(400).render("signup", { locals, errors });
  }

  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  // create password
  try {
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const locals = {
      title: "♠️ Login ♣️",
    };

    if (newUser) {
      return res.redirect("/auth/login");
    } else throw new Error("User not created");
  } catch (err) {
    console.log(err);

    const errors = {
      serverError: "Something went wrong. Please try again later.",
    };
    return res.status(500).render("signup", { locals, errors });
  }
};

// logout

const logout = async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else res.redirect("/");
  });
};

// MEMBERSHIP

const handleMembership = async (req, res) => {
  const { otp1, otp2, otp3, otp4 } = req.body;

  const inputCode = [otp1, otp2, otp3, otp4].join("");

  const parsedCode = Number(inputCode);

  const userId = req.user._id;

  console.log(inputCode, parsedCode, userId);

  // CODE TO CHECK AGAINST FOR MEMBERSHIP

  const membershipCode = 1969;

  if (parsedCode !== membershipCode) {
    const errors = {
      wrongCode: "How can you mess that up 🤦",
    };
    const isLoggedIn = req.isAuthenticated();

    const locals = {
      title: "Get Membership 😎",
      isLoggedIn,
    };
    return res.render("enlist", { locals, errors });
  }

  // SUCCESS

  const modifyMembershipStatus = await User.findByIdAndUpdate(userId, {
    membershipStatus: true,
  });

  return res.redirect("/board");
};

// ADMIN STATUS

const handleAdminStatus = async (req, res) => {
  const { otp1, otp2, otp3, otp4 } = req.body;

  const inputCode = [otp1, otp2, otp3, otp4].join("");

  const parsedCode = Number(inputCode);

  const userId = req.user._id;

  console.log(inputCode, parsedCode, userId);

  // CODE TO CHECK AGAINST FOR admin status

  const adminCode = 1337;

  if (parsedCode !== adminCode) {
    const errors = {
      wrongCode: "ACCESS DENIED",
    };
    const isLoggedIn = req.isAuthenticated();

    const locals = {
      title: "Get Admin Status 😎",
      isLoggedIn,
    };
    return res.render("admin", { locals, errors });
  }

  // SUCCESS

  const modifyAdminStatus = await User.findByIdAndUpdate(userId, {
    membershipStatus: true,
    isAdmin: true,
  });

  return res.redirect("/board");
};

/* ------------------------------------ . ----------------------------------- */
module.exports = {
  signup,
  logout,
  handleMembership,
  handleAdminStatus,
};
