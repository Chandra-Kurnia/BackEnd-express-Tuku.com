const userModels = require("../models/users");
const { encrypt, decrypt } = require("../helpers/pw_hash");
const helperProducts = require("../helpers/product");
const { v4: uuidv4 } = require('uuid');

const getAllUser = (req, res, next) => {
  userModels
    .getAllUser()
    .then((result) => {
      const data = result;
      res.json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "connection model and controller have a problem",
      });
    });
};
//
const createUser = (req, res, next) => {
  // 1. Bentuk panjang
  // const nama = req.body.name
  // const umur = req.body.umur
  // const gender = req.body.gender
  // 2. menggunakan destracturing
  // const {name, email} = req.body -> menerima request dari body
  // res.json({ -> mengembalikan response kepada user
  //     "name": name,
  //     "email": email,
  // })

  // hubungkan dengan models, lalu kirimkan request dari user
  const {
    roles,
    name,
    email,
    pass,
    phone_number,
    store_name
  } = req.body;
  const store_id = uuidv4();
  //   pw hash
  const password = pass;
  const data = {
    roles,
    name,
    email,
    password,
    phone_number,
    store_name,
    store_id
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
    .catch((err) => {
      helperProducts.response(res, 500, "Server internal error", null, err);
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const {
    roles,
    name,
    email,
    sex,
    date_birth,
    month_birth,
    year_birth,
    phone_number,
  } = req.body;

  const date_of_birth = `${year_birth}-${month_birth}-${date_birth}`;
  const data = {
    roles,
    name,
    email,
    sex,
    date_of_birth,
    phone_number,
  };

  userModels
    .updateUser(data, id)
    .then((result)=>{
        helperProducts.response(res, 201, `Successfully updated data with id = ${id}`, data)
    })
    .catch((err) => {
        helperProducts.response(res, 500, "Internal server error", null, err)
    })
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModels.deleteUsers(id)
  .then(result => {
    helperProducts.response(res, 200, `Succesfully deleted data with id = ${id}`)
  })
  .catch(err => {
    helperProducts.response(res, 500, "Internal server error", null, err)
  })
}

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser
};
