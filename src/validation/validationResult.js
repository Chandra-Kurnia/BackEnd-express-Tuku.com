const { validationResult } = require("express-validator");
const { response } = require('../helpers/response')

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, null, 400, errors.array())
  }
  next();
};

module.exports = validateResult;