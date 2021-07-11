const userModels = require('../models/users');
// const { encrypt, decrypt } = require('../helpers/pw_hash');
const helperProducts = require('../helpers/product');

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
    phoneNumber,
  } = req.body;
  //   pw hash
  const password = pass;
  const data = {
    name,
    email,
    password,
    phone_number: phoneNumber,
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
    .catch((err) => {
      helperProducts.response(res, 500, 'Server internal error', null, err);
    });
};

const showUser = (req, res) => {
  const { id } = req.params;
  userModels
    .showUser(id)
    .then((result) => {
      helperProducts.response(res, 200, 'All data successfully loaded', result);
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
