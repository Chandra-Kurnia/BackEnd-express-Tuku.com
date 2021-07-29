const conn = require("../config/db");

const getAllUser = () =>
  new Promise((resolve, reject) => {
    conn.query("SELECT * FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });

const showUser = (id) =>
  new Promise((resolve, reject) => {
    conn.query("SELECT * FROM users WHERE id_user = ?", id, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const createUser = (data) =>
  new Promise((resolve, reject) => {
    conn.query("INSERT INTO users SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const updateUser = (data, id) =>
  new Promise((resolve, reject) => {
    conn.query(
      "UPDATE users SET ? WHERE id_user = ?",
      [data, id],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });

const deleteUsers = (id) =>
  new Promise((resolve, reject) => {
    conn.query("DELETE FROM users WHERE id_user = ?", id, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const activate = (email) => new Promise((resolve, reject) => {
  conn.query("UPDATE users SET status = 1 WHERE email = ? ", email, (err, result) => {
    if(!err){
      resolve(result);
    }else{
      reject(err);
    }
  })
})

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUsers,
  showUser,
  activate
};
