const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/product');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');
const redis = require('../middleware/redis');
const validateResult = require('../validation/validationResult');
const { createUpdateProductRules } = require('../validation/productValidate');

// Route target
router
  .get('/', ProductController.getAllProduct)
  .get('/getByStore', auth.authenticationAsSeller, ProductController.getByStore)
  .post(
    '/',
    auth.authenticationAsSeller,
    upload.single('image'),
    createUpdateProductRules(),
    validateResult,
    ProductController.createProduct,
  )
  .get('/show/:id', ProductController.showProduct)
  .get(
    '/category/:category',
    ProductController.showCategory,
  )
  .put(
    '/:id',
    auth.authenticationAsSeller,
    upload.single('image'),
    createUpdateProductRules(),
    validateResult,
    ProductController.updateProduct,
  )
  .delete('/:id', auth.authenticationAsSeller, ProductController.deleteProduct)
  .get('/clear', redis.clearAllChaceProduct);
// Export
module.exports = router;
