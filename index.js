const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fileupload = require('express-fileupload');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const v1 = require('./src/routes/v1');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(fileupload());

app.use('/v1', v1);
app.use('/file', express.static(process.env.IMAGE_URL));
app.use('/avatar', express.static('./public/avatar'));

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
