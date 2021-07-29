const conn = require("../config/db");

const createStore = (data) =>
  new Promise((resolve, reject) => {
    conn.query("INSERT INTO store SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const getAllStore = (order, keyword, limit, page) => {
  let limitStart = 0;
  let defaultLimit = 5;
  // Limit
  if (limit) {
    defaultLimit = limit;
  }

  // Page
  if (page > 1) {
    limitStart = defaultLimit * (page - 1);
  }

  // BaseQuery
  let baseQuery = "SELECT * FROM store";

  //   Search
  if (keyword) {
    baseQuery += ` WHERE store_name LIKE '%${keyword}%'`;
  }

  //   Order
  if (order) {
    baseQuery += ` ORDER BY id_product ${order}`;
  }

  baseQuery += ` LIMIT ${limitStart},${defaultLimit}`;

  return new Promise((resolve, reject) => {
    conn.query(baseQuery, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const showStore = (id) =>
  new Promise((resolve, reject) => {
    conn.query("SELECT * FROM store WHERE store_id = ?", id, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const updateStore = (data, id) =>
  new Promise((resolve, reject) => {
    conn.query(
      "UPDATE store SET ? WHERE store_id = ?",
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

const deleteStore = (id) =>
  new Promise((resolve, reject) => {
    conn.query(`DELETE FROM store WHERE store_id = ${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const activate = (email) =>
  new Promise((resolve, reject) => {
    conn.query(
      "UPDATE store set status = 1 WHERE email = ?",
      email,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });

module.exports = {
  createStore,
  getAllStore,
  showStore,
  updateStore,
  deleteStore,
  activate
};
