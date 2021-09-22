const express = require('express');

const router = express.Router();
const createError = require('http-errors');

const userRouter = require('./users');
const productRouter = require('./product');
const storeRouter = require('./store');
const orderRouter = require('./order');

router
  .use('/product', productRouter)
  .use('/users', userRouter)
  .use('/store', storeRouter)
  .use('/order', orderRouter)
  .use('*', (req, res, next) => {
    const error = new createError.NotFound();
    next(error);
  });

module.exports = router;
