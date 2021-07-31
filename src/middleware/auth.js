const jwt = require("jsonwebtoken");
const handleError = require("../helpers/handleError");
const helperEmail = require("../helpers/email");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("server need token");
    error.code = 401;
    return next(error);
  } else {
    const result = token.split(" ")[1];
    jwt.verify(result, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          handleError(res, "Login failed", 401, "Your Token Is Expired");
        } else if (err.name === "JsonWebTokenError") {
          handleError(res, "Login failed", 401, "Your Token Is Invalid");
        } else {
          handleError(res, "Login failed", 401, "Your Token Isn't Active");
        }
      } else {
        next();
      }
    });
  }
};

const authenticationAsSeller = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("server need token");
    error.code = 401;
    return next(error);
  } else {
    const result = token.split(" ")[1];
    jwt.verify(result, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          handleError(res, "Login failed", 401, "Your Token Is Expired");
        } else if (err.name === "JsonWebTokenError") {
          handleError(res, "Login failed", 401, "Your Token Is Invalid");
        } else {
          handleError(res, "Login failed", 401, "Your Token Isn't Active");
        }
      } else {
        if (decoded.role !== "store") {
          handleError(
            res,
            "Acces denied",
            403,
            "You don't have permission for access this service"
          );
        } else {
          next();
        }
      }
    });
  }
};

module.exports = {
  authentication,
  authenticationAsSeller,
};
