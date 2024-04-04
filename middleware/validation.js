const { body, validationResult } = require("express-validator");

// "fullName", "email", "password", "confirmPassword"
const signupValidationRules = () => {
  return [
    body("fullName")
      .notEmpty()
      .withMessage("Full Name must not be empty")
      .isLength({ min: 3 })
      .withMessage("Full name must be atleast three characters long."),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast six characters!"),
    body("confirmPassword")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Passwords do not match"),
  ];
};

//

const loginValidationRules = () => {
  return [body("email").notEmpty().isEmail(), body("password").notEmpty()];
};

const messageValidationRules = () => {
  return [body("title").notEmpty(), body("message").notEmpty()];
};

module.exports = {
  loginValidationRules,
  signupValidationRules,
  messageValidationRules,
};
