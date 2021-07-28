const { body } = require("express-validator");

const createUpdateProductRules = () => [
  body("productName").isEmpty().withMessage("Please insert a product name"),
  body("store_id")
    .isEmpty()
    .withMessage("store id is empty"),
  body("category")
    .isEmpty()
    .withMessage("Please select a category"),
  body("color").isEmpty().withMessage("Please select a color"),
  body("size").isEmpty().withMessage("Please select a product size"),
  body("price")
    .isEmpty()
    .withMessage("Please insert your product price"),
  body("quantity")
    .isEmpty()
    .withMessage("Please insert your product quantity"),
  body("status").isEmpty().withMessage("Please select a product condition"),
];

module.exports = {
  createUpdateProductRules,
};
