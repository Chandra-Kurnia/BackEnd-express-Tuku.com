const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/product');

// Route target
router
  .get('/', ProductController.getAllProduct)
  .post('/', ProductController.createProduct)
  .get('/show/:id', ProductController.showProduct)
  .put('/update/:id', ProductController.updateProduct)
  .delete('/delete/:id', ProductController.deleteProduct);

// Export
module.exports = router;
