const express = require('express');

const router = express.Router();
const storeController = require('../controllers/store');

// Route target
router
  .post('/', storeController.createStore)
  .get('/', storeController.getAllStore)
  .get('/:id', storeController.showStore)
  .put('/:id', storeController.updateStore)
  .delete('/:id', storeController.deleteStore);

// Export
module.exports = router;
