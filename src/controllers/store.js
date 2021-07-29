const modelStore = require("../models/store");
const helpersProduct = require("../helpers/product");
const helperEmail = require("../helpers/email");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../helpers/activateAccount");

const createStore = (req, res) => {
  const { owner, email, phoneNumber, storeName, pass } = req.body;
  if (!owner || !email || !phoneNumber || !pass || !storeName) {
    helpersProduct.response(
      res,
      400,
      "Bad Request, your inserted a wrong input"
    );
  } else {
    // Validation succes
    helperEmail.findEmail(email, "store").then((result) => {
      if (result[0]) {
        res.json({
          message: "email sudah terdaftar",
        });
      } else {
        bcrypt.hash(pass, 10, (err, hash) => {
          const password = hash;
          const data = {
            owner,
            email,
            phone_number: phoneNumber,
            store_name: storeName,
            password,
            status: 0,
          };

          modelStore
            .createStore(data)
            .then(() => {
              jwt.sign(
                { email: data.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" },
                (err, token) => {
                  if (err) {
                    helperProducts.response(
                      res,
                      500,
                      "failed create activate user token"
                    );
                  } else {
                    sendEmail(data.email, token, "store");
                  }
                }
              );
              delete data.password;
              helpersProduct.response(
                res,
                200,
                "Data successfully inserted",
                data,
                null
              );
            })
            .catch((err) => {
              helpersProduct.response(res, 500, "Server error", null, err);
            });
        });
      }
    });
  }
};

const getAllStore = (req, res) => {
  const { order, keyword, limit, page } = req.query;

  modelStore
    .getAllStore(order, keyword, limit, page)
    .then((dataProduct) => {
      const amount = dataProduct.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, "Data Not Found", null);
      } else {
        helpersProduct.response(
          res,
          200,
          "all data successfully loaded",
          dataProduct,
          null,
          order,
          keyword,
          amount
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, "Server error", null, err);
    });
};

const showStore = (req, res) => {
  const { id } = req.params;
  modelStore
    .showStore(id)
    .then((product) => {
      const amount = product.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, "Data Not Found", null);
      } else {
        helpersProduct.response(
          res,
          200,
          `succes get data with id = ${id}`,
          product
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, "Internal server error", null, err);
    });
};

const updateStore = (req, res) => {
  const { id } = req.params;
  const { owner, email, phoneNumber, storeName, storeDesc } = req.body;
  if (!owner || !email || !phoneNumber || !storeName || !storeDesc) {
    helpersProduct.response(
      res,
      400,
      "Bad Request, you inserted a wrong input !"
    );
  } else {
    const data = {
      owner,
      email,
      phone_number: phoneNumber,
      store_name: storeName,
      store_desc: storeDesc,
      updated_at: new Date(),
    };
    modelStore
      .updateStore(data, id)
      .then((result) => {
        helpersProduct.response(
          res,
          200,
          `Successfully updated data store with id ${id}`,
          result,
          null
        );
      })
      .catch((err) => {
        helpersProduct.response(res, 500, "Server error", null, err);
      });
  }
};

const deleteStore = (req, res) => {
  const { id } = req.params;
  modelStore
    .deleteStore(id)
    .then((result) => {
      helpersProduct.response(
        res,
        200,
        `Successfully delete store with id = ${id}`,
        result,
        null
      );
    })
    .catch((err) => {
      helpersProduct.response(res, 500, "Server error", null, err);
    });
};

const activate = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        handleError(res, "Login failed", 401, "Your Token Is Expired");
      } else if (err.name === "JsonWebTokenError") {
        handleError(res, "Login failed", 401, "Your Token Is Invalid");
      } else {
        handleError(res, "Login failed", 401, "Your Token Isn't Active");
      }
    } else {
      modelStore.activate(decoded.email)
      helpersProduct.response(res, 200, "your data succesfully activated");
    }
  });
};

module.exports = {
  createStore,
  getAllStore,
  showStore,
  updateStore,
  deleteStore,
  activate
};
