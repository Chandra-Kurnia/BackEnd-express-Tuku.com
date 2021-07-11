const conn = require('../config/db');

const getAllUser = () => new Promise((resolve, reject) => {
  conn.query('SELECT * FROM users', (error, result) => {
    if (!error) {
      resolve(result);
    } else {
      reject(error);
    }
  });
});

const createUser = (data) => new Promise((resolve, reject) => {
  // if seller create new store
  if (data.roles === 'seller') {
    const dataStore = {
      store_id: data.store_id,
      store_name: data.store_name,
    };
    conn.query('INSERT INTO store SET ?', dataStore);
  }

  const dataUser = {
    roles: data.roles,
    name: data.name,
    email: data.email,
    password: data.email,
    phone_number: data.phone_number,
    store_id: data.store_id,
  };
  conn.query('INSERT INTO users SET ?', dataUser, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const updateUser = (data, id) => new Promise((resolve, reject) => {
  conn.query(
    'UPDATE users SET ? WHERE id_user = ?',
    [data, id],
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

const deleteUsers = (id) => new Promise((resolve, reject) => {
  conn.query('DELETE FROM users WHERE id_user = ?', id, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUsers,
};
