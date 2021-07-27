const { body, param } = require("express-validator");

const createUpdateStoreRules = () => [
  body("owner")
    .notEmpty()
    .withMessage("Name cannot empty")
    .bail()
    .isLength({ min: 4, max: 40 })
    .withMessage("Name min 4, max 40"),
  body("email")
    .notEmpty()
    .withMessage("email cannot empty")
    .bail()
    .isEmail()
    .withMessage("Your email is invalid"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number cannot empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Phone number min 3, max 20"),
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

const showStoreRules = () => [

];

module.exports = {
  createUpdateStoreRules,
};
