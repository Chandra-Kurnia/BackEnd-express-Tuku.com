const jwt = require('jsonwebtoken');
const { response } = require('../helpers/response');

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return response(res, null, 400, [{ msg: 'Authorization error' }]);
  }
  const result = token.split(' ')[1];
  jwt.verify(result, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        response(res, null, 400, [{ msg: 'Your token is Expired' }]);
      } else if (err.name === 'JsonWebTokenError') {
        response(res, null, 400, [{ msg: 'Your token is invalid' }]);
      } else {
        response(res, null, 400, [{ msg: 'Your token is not active' }]);
      }
    } else {
      req.userLogin = decoded;
      next();
    }
  });
};

const authenticationAsSeller = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return response(res, null, 400, [{ msg: 'Authorization error' }]);
  }
  const result = token.split(' ')[1];
  jwt.verify(result, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        response(res, null, 400, [{ msg: 'Your token is Expired' }]);
      } else if (err.name === 'JsonWebTokenError') {
        response(res, null, 400, [{ msg: 'Your token is invalid' }]);
      } else {
        response(res, null, 400, [{ msg: 'Your token is not active' }]);
      }
    } else if (decoded.role !== 'store') {
      response(
        res,
        'Acces denied',
        403,
        "You don't have permission for access this service",
      );
    } else {
      next();
    }
  });
};

module.exports = {
  authentication,
  authenticationAsSeller,
};
