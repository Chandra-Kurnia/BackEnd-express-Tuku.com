const { body } = require('express-validator');

const createUpdateProductRules = () => [
  body('productName').notEmpty().withMessage('Please insert a product name'),
  body('price').notEmpty().withMessage('Please insert your product price'),
  body('quantity').notEmpty().withMessage('Please insert your product quantity'),
  body('size').notEmpty().withMessage('Please select a product size'),
  body('category').notEmpty().withMessage('Please select a category'),
  body('color').notEmpty().withMessage('Please select a color'),
  body('status').notEmpty().withMessage('Please select a product condition'),
  body('description').notEmpty().withMessage(
    'Please insert your product description',
  ),
  body('store_id').notEmpty().withMessage('store id is empty'),
];

module.exports = {
  createUpdateProductRules,
};
