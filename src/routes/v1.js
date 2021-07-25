const express = require('express')
const router = express.Router();

const userRouter = require('./users');
const productRouter = require('./product');
const storeRouter = require('./store');

router
.use('/product', productRouter)
.use('/users', userRouter)
.use('/store', storeRouter)
.use('*', (req, res, next) => {
    const error = new createError.NotFound();
    next(error);
  });

module.exports = router