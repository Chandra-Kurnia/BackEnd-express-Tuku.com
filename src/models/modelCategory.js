const conn = require('../config/db');

const createCategory = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO category SET ?', data, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const getCategory = () => new Promise((resolve, reject) => {
  conn.query('SELECT * FROM category', (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const showCategory = (id) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM category WHERE id_category = ${id}`, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const updateCategory = (data, id) => new Promise((resolve, reject) => {
  conn.query('UPDATE category SET ? WHERE id_category = ?', [data, id], (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const deleteCategory = (id) => new Promise((resolve, reject) => {
  conn.query(`DELETE FROM category WHERE id_category = ${id}`, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

module.exports = {
  createCategory,
  getCategory,
  showCategory,
  deleteCategory,
  updateCategory,
};
