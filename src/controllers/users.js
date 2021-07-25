const bcrypt = require("bcrypt");
const userModels = require("../models/users");
const helperEmail = require('../helpers/email')
const helperProducts = require("../helpers/product");
const jwt = require("jsonwebtoken");

const getAllUser = (req, res) => {
  userModels
    .getAllUser()
    .then((result) => {
      helperProducts.response(res, 200, "All data successfully loaded", result);
    })
    .catch((err) => {
      helperProducts.response(res, 500, "Internal server error", null, err);
    });
};
//
const createUser = async (req, res) => {
  const { name, email, pass, roles } = req.body;
  if (!name || !email || !pass) {
    helperProducts.response(res, 400, "Bad request");
  } else {
    // Validation success
    await helperEmail.findEmail(email, "users").then((result) => {
      if (result[0]) {
        res.json({
          message: "email sudah terdaftar",
        });
      } else {
        //   pw hash
        bcrypt.hash(pass, 10, (err, hash) => {
          const password = hash;
          const data = {
            name,
            email,
            password,
          };
          userModels
            .createUser(data)
            .then(() => {
              helperProducts.response(
                res,
                201,
                "Data successfully Created",
                data,
                null
              );
            })
            .catch((error) => {
              helperProducts.response(
                res,
                500,
                "Server internal error",
                null,
                error
              );
            });
        });
      }
    });
  }
};

const showUser = (req, res) => {
  const { id } = req.params;
  userModels
    .showUser(id)
    .then((result) => {
      const amount = result.length;
      if (amount < 1) {
        helperProducts.response(res, 404, "Data not found", null);
      } else {
        helperProducts.response(
          res,
          200,
          `success get data with id = ${id}`,
          result
        );
      }
    })
    .catch((err) => {
      helperProducts.response(res, 500, "Internal server error", null, err);
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, sex, dateBirth, monthBirth, yearBirth, phoneNumber } =
    req.body;

  if (!name || !email) {
    helperProducts.response(
      res,
      400,
      "Bad request, you inserted a wrong input"
    );
  } else {
    const dateOfBirth = `${yearBirth}-${monthBirth}-${dateBirth}`;
    const data = {
      name,
      email,
      sex,
      date_of_birth: dateOfBirth,
      phone_number: phoneNumber,
      updated_at: new Date(),
    };

    userModels
      .updateUser(data, id)
      .then(() => {
        helperProducts.response(
          res,
          201,
          `Successfully updated data with id = ${id}`,
          data
        );
      })
      .catch((err) => {
        helperProducts.response(res, 500, "Internal server error", null, err);
      });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModels
    .deleteUsers(id)
    .then(() => {
      helperProducts.response(
        res,
        200,
        `Succesfully deleted data with id = ${id}`
      );
    })
    .catch((err) => {
      helperProducts.response(res, 500, "Internal server error", null, err);
    });
};

// Auth
const login = async (req, res, next) => {
  const { roles, email, password } = req.body;
  let role = "";
  if (roles === "seller") {
    role += "store";
  } else if (roles === "customer") {
    role += "users";
  } else {
    console.log("error - wrong roles");
  }

  await helperEmail.findEmail(email, role)
    .then((result) => {
      const user = result[0];
      if (!user) {
        res.json({
          a: "email tidak ditemukan",
        });
      } else {
        bcrypt.compare(password, user.password, (err, resCompare) => {
          if (!resCompare) {
            res.json({
              message: "password wrong",
            });
          } else {
            if(user.id_user){
              jwt.sign(
                { id: user.id_user, email, role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" },
                (err, token) => {
                  delete user.password;
                  user.token = token;
                  res.json({
                    message: "successfully created user token",
                    status: 200,
                    data: user,
                  });
                }
              );
            }else{
              jwt.sign(
                { id: user.store_id, email, role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" },
                (err, token) => {
                  delete user.password;
                  user.token = token;
                  res.json({
                    message: "successfully created user token",
                    status: 200,
                    data: user,
                  });
                }
              );
            }
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: "ada error" + err,
      });
    });
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  showUser,
  login,
};
