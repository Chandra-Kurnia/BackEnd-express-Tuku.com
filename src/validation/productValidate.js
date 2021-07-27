const { body } = require("express-validator");

const createUpdateProductRules = () => [
  body("productName").notEmpty().withMessage("Please insert a product name"),
  body("store_id")
    .notEmpty()
    .withMessage("store id is empty")
    .bail()
    .isNumeric()
    .withMessage("store id is not a number"),
  body("category")
    .notEmpty()
    .withMessage("Please select a category")
    .bail()
    .isNumeric()
    .withMessage("category is not a number"),
  body("color").notEmpty().withMessage("Please select a color"),
  body("size").notEmpty().withMessage("Please select a product size"),
  body("price")
    .notEmpty()
    .withMessage("Please insert your product price")
    .bail()
    .isNumeric()
    .withMessage("Price must be number"),
  body("quantity")
    .notEmpty()
    .withMessage("Please insert your product quantity")
    .bail()
    .isNumeric()
    .withMessage("Quantity must be number"),
  body("status").notEmpty().withMessage("Please select a product condition"),
];

module.exports = {
  createUpdateProductRules,
};
