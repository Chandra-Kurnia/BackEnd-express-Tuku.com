const { body, param } = require("express-validator");

const createUpdateStoreRules = () => [
  body("owner")
    .notEmpty()
    .withMessage("Owner cannot empty")
    .bail()
    .isLength({ min: 4, max: 40 })
    .withMessage("Min 4, max 40"),
  body("email")
    .notEmpty()
    .withMessage("email cannot empty")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number cannot empty")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Phone number min 3, max 20")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be number"),
  body("storeName")
    .notEmpty()
    .withMessage("Store name cannot empty")
    .isLength({ min: 4, max: 40 })
    .withMessage("Store name min 4, max 40"),
  body("pass")
    .notEmpty()
    .withMessage("Password cannot empty")
    .bail()
    .isLength({ min: 4, max: 15 })
    .withMessage("Password min 4 & max 15"),
];

const updateStoreRules = () => [
  body("email")
    .notEmpty()
    .withMessage("email cannot empty")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number cannot empty")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Phone number min 3, max 20")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be number"),
  body("storeName")
    .notEmpty()
    .withMessage("Store name cannot empty")
    .isLength({ min: 4, max: 40 })
    .withMessage("Store name min 4, max 40"),
];

module.exports = {
  createUpdateStoreRules,
  updateStoreRules,
};
