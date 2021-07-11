const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/product');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/users', userRouter);
app.use('/product', productRouter);

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});

app.listen(4000, () => {
  console.log('server is running on port 4000');
});
