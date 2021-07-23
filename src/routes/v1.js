const express = require('express')
const router = express.Router();

const userRouter = require('./users');
const productRouter = require('./product');

router
.use('/product', productRouter)
.use('/users', userRouter);

module.exports = router