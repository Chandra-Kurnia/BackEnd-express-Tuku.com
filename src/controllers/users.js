const bcrypt = require('bcrypt');
const userModels = require('../models/users');
// const { encrypt, decrypt } = require('../helpers/pw_hash');
const helperProducts = require('../helpers/product');

const saltRounds = 10;

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
const createUser = (req, res) => {
  const {
    name,
    email,
    pass,
  } = req.body;
  if (!name || !email || !pass) {
    helperProducts.response(res, 400, 'Bad request');
  } else {
    // Validation success
    //   pw hash
    bcrypt.hash(pass, saltRounds, (err, hash) => {
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
            'Data successfully Created',
            data,
            null,
          );
        })
        .catch((error) => {
          helperProducts.response(res, 500, 'Server internal error', null, error);
        });
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
        helperProducts.response(res, 404, 'Data not found', null);
      } else {
        helperProducts.response(res, 200, `success get data with id = ${id}`, result);
      }
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    sex,
    dateBirth,
    monthBirth,
    yearBirth,
    phoneNumber,
  } = req.body;

  if (!name || !email) {
    helperProducts.response(res, 400, 'Bad request, you inserted a wrong input');
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
        helperProducts.response(res, 201, `Successfully updated data with id = ${id}`, data);
      })
      .catch((err) => {
        helperProducts.response(res, 500, 'Internal server error', null, err);
      });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModels.deleteUsers(id)
    .then(() => {
      helperProducts.response(res, 200, `Succesfully deleted data with id = ${id}`);
    })
    .catch((err) => {
      helperProducts.response(res, 500, 'Internal server error', null, err);
    });
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  showUser,
};
