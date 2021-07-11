const { v4: uuidv4 } = require('uuid');
const userModels = require('../models/users');
// const { encrypt, decrypt } = require('../helpers/pw_hash');
const helperProducts = require('../helpers/product');

const getAllUser = (req, res) => {
  userModels
    .getAllUser()
    .then((result) => {
      const data = result;
      res.json({
        status: 'Success',
        data,
      });
    })
    .catch(() => {
      res.json({
        message: 'connection model and controller have a problem',
      });
    });
};
//
const createUser = (req, res) => {
  // 1. Bentuk panjang
  // const nama = req.body.name
  // const umur = req.body.umur
  // const gender = req.body.gender
  // 2. menggunakan destracturing
  // const {name, email} = req.body -> menerima request dari body
  // res.json({ -> mengembalikan response kepada user
  //     'name': name,
  //     'email': email,
  // })

  // hubungkan dengan models, lalu kirimkan request dari user
  const {
    roles,
    name,
    email,
    pass,
    phoneNumber,
    storeName,
  } = req.body;
  const storeId = uuidv4();
  //   pw hash
  const password = pass;
  const data = {
    roles,
    name,
    email,
    password,
    phone_number: phoneNumber,
    store_name: storeName,
    store_id: storeId,
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

const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    roles,
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
    roles,
    name,
    email,
    sex,
    date_of_birth: dateOfBirth,
    phone_number: phoneNumber,
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
};
