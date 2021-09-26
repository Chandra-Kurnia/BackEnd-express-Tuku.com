/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const userModels = require('../models/users');
const helperEmail = require('../helpers/email');
const helperProducts = require('../helpers/product');
const { sendEmail } = require('../helpers/activateAccount');
const { response } = require('../helpers/response');

const getAllUser = (req, res) => {
  userModels
    .getAllUser()
    .then((result) => {
      helperProducts.response(res, 200, 'All data successfully loaded', result);
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};
//
const createUser = async (req, res) => {
  const { name, email, pass } = req.body;
  // Validation success
  await helperEmail.findEmail(email, 'users').then((result) => {
    if (result[0]) {
      response(res, null, 400, [{ msg: 'email already registered' }]);
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
            jwt.sign(
              { email: data.email, status: 0 },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '24h' },
              (error, token) => {
                if (err) {
                  helperProducts.response(
                    res,
                    500,
                    'failed create activate user token',
                  );
                } else {
                  sendEmail(data.email, token, 'users');
                }
              },
            );
            helperProducts.response(
              res,
              201,
              `Data successfully Created please activate your account, we send code verification to ${email}`,
              data,
              null,
            );
          })
          .catch((error) => {
            helperProducts.response(
              res,
              500,
              'Server internal error',
              null,
              error,
            );
          });
      });
    }
  });
};

const showUser = (req, res) => {
  const { id } = req.params;
  userModels
    .showUser(id)
    .then((result) => {
      const amount = result.length;
      if (amount < 1) {
        helperProducts.response(res, 404, 'Data not found', null);
      } else {
        helperProducts.response(
          res,
          200,
          `success get data with id = ${id}`,
          result,
        );
      }
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name, email, sex, dateBirth, monthBirth, yearBirth, phone_number,
  } = req.body;
  const dateOfBirth = `${yearBirth}-${monthBirth}-${dateBirth}`;

  let data = {
    name,
    email,
    sex,
    date_of_birth: dateOfBirth,
    phone_number,
    updated_at: new Date(),
  };

  const currentUser = await userModels.showUser(id);

  if (req.files) {
    if (req.files.avatar.mimetype !== 'image/jpeg' && req.files.avatar.mimetype !== 'image/png') {
      return helperProducts.response(res, 400, 'Only img/jpg/png is allowed', null, []);
    } if (req.files.avatar.size > 1048576 * 5) {
      return helperProducts.response(res, 400, 'image size max is 5mb', null, []);
    }
    const filename = uuidv4() + path.extname(req.files.avatar.name);
    const savePath = path.join(path.dirname(''), '/public/avatar', filename);
    req.files.avatar.mv(savePath);
    data = { ...data, avatar: `/avatar/${filename}` };
    if (currentUser[0].avatar !== null) {
      fs.unlink(`./public/${currentUser[0].avatar}`, (err) => {
        if (err) {
          console.log('Error unlink avatar');
          console.log(err);
        }
      });
    }
  }

  userModels
    .updateUser(data, id)
    .then(() => {
      userModels.showUser(id)
        .then((newData) => {
          const newDataUser = newData[0];
          delete newDataUser.password;
          newDataUser.role = 'customer';
          jwt.sign(
            { ...newDataUser },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' },
            (error, token) => {
              newDataUser.token = token;
              helperProducts.response(
                res,
                201,
                `Successfully updated data with id = ${id}`,
                newDataUser,
              );
            },
          );
        })
        .catch((error) => {
          helperProducts.response(res, 500, 'Internal server error', null, error);
        });
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModels
    .deleteUsers(id)
    .then(() => {
      helperProducts.response(
        res,
        200,
        `Succesfully deleted data with id = ${id}`,
      );
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};

// Auth
const login = (req, res) => {
  const { roles, email, password } = req.body;
  let role = '';
  if (roles === 'seller') {
    role += 'store';
  } else if (roles === 'customer') {
    role += 'users';
  } else {
    response(res, null, 400, [{ msg: 'wrong roles' }]);
  }

  helperEmail
    .findEmail(email, role)
    .then((result) => {
      const user = result[0];
      if (!user) {
        response(res, null, 400, [{ msg: 'Email not found' }]);
      } else if (user.status !== 1) {
        response(res, null, 400, [{ msg: 'Email not activated' }]);
      } else {
        bcrypt.compare(password, user.password, (err, resCompare) => {
          if (!resCompare) {
            response(res, null, 400, [{ msg: 'password wrong' }]);
          } else if (user.id_user) {
            user.role = 'customer';
            jwt.sign(
              { ...user },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '24h' },
              (error, token) => {
                user.token = token;
                delete user.password;
                response(res, user, 200);
              },
            );
          } else {
            user.role = 'seller';
            jwt.sign(
              { ...user },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '24h' },
              (error, token) => {
                delete user.password;
                user.token = token;
                response(res, user, 200);
              },
            );
          }
        });
      }
    })
    .catch((err) => {
      response(res, null, 400, { message: 'Internal server error' });
    });
};

const activate = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        response(res, null, 400, [{ msg: 'Your token is Expired' }]);
      } else if (err.name === 'JsonWebTokenError') {
        response(res, null, 400, [{ msg: 'Your token is invalid' }]);
      } else {
        response(res, null, 400, [{ msg: 'Your token is not active' }]);
      }
    } else {
      userModels.activate(decoded.email);
      helperProducts.response(res, 200, 'your account succesfully activated');
    }
  });
};

const getuserfromtoken = (req, res) => {
  try {
    response(res, req.userLogin, 200, []);
  } catch (error) {
    response(res, [], 500, 'Decoded error');
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  showUser,
  login,
  activate,
  getuserfromtoken,
};
