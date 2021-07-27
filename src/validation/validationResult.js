const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      error: errors.errors[0].msg,
    });
  }
  next();
};

module.exports = validateResult;