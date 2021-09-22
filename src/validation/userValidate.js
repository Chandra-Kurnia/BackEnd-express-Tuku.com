const { body } = require("express-validator");

// Register
const registerUpdateFieldRules = () => [
  body("name")
    .notEmpty()
    .withMessage("Name cannot empty")
    .bail()
    .isLength({ min: 4, max: 40 })
    .withMessage("name min 4 & max 40"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot empty")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid"),
  body("pass")
    .notEmpty()
    .withMessage("Password cannot empty")
    .bail()
    .isLength({ min: 4, max: 15 })
    .withMessage("Password min 4 & max 15"),
];

const UpdateFieldRules = () => [
  body("name")
    .notEmpty()
    .withMessage("Name cannot empty")
    .bail()
    .isLength({ min: 4, max: 40 })
    .withMessage("name min 4 & max 40"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot empty")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid"),
];

// Auth
const LoginFieldRules = () => [
  body("email")
    .notEmpty()
    .withMessage("Email required!")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid!"),
  body("password").notEmpty().withMessage("Your password is null!"),
];

module.exports = {
  LoginFieldRules,
  registerUpdateFieldRules,
  UpdateFieldRules
};
