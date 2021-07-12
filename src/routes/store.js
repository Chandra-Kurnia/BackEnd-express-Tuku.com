const express = require('express');

const router = express.Router();
const storeController = require('../controllers/store');
const categoryController = require('../controllers/categoryController');

// Route target
router
  .post('/', storeController.createStore)
  .post('/category', categoryController.createCategory)
  .get('/', storeController.getAllStore)
  .get('/category', categoryController.getCategory)
  .get('/:id', storeController.showStore)
  .get('/category/:id', categoryController.showCategory)
  .put('/:id', storeController.updateStore)
  .put('/category/:id', categoryController.updateCategory)
  .delete('/category/:id', categoryController.deleteCategory)
  .delete('/:id', storeController.deleteStore);

// Export
module.exports = router;
