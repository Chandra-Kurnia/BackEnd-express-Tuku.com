const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/product');
const storeRouter = require('./src/routes/store');
// const setCors = require('./src/middleware/cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/product', productRouter);
app.use('/users', userRouter);
app.use('/store', storeRouter);

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log('server is running on port 4000');
});
