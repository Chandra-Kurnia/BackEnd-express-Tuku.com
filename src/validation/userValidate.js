const { body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.errors[0].msg,
    });
  }
  next();
};

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
  validateResult,
  registerUpdateFieldRules,
};
