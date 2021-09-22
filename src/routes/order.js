const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/createorder', auth.authentication, orderController.createOrder)
  .get('/getorder', auth.authentication, orderController.showAllOrder);

module.exports = router;
