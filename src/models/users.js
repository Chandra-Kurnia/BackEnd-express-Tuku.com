const conn = require("../config/db");

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    // if seller create new store
    if(data.roles == "seller"){
      const data_store = {
        store_id: data.store_id,
        store_name: data.store_name
      }
      conn.query("INSERT INTO store SET ?", data_store)
    }

    const data_user = {
      roles: data.roles,
      name: data.name,
      email: data.email,
      password: data.email,
      phone_number: data.phone_number,
      store_id: data.store_id
    }
    conn.query("INSERT INTO users SET ?", data_user, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const updateUser = (data, id) => {
  return new Promise((resolve, reject) => {
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
};

const deleteUsers = id => {
  return new Promise((resolve, reject)=> {
    conn.query("DELETE FROM users WHERE id_user = ?", id, (err, result) => {
      if(!err){
        resolve(result)
      }
      else{
        reject(err)
      }
    })
  })
}

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUsers
};
