const conn = require('../config/db');

const createOrder = (dataOrder) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO orders SET ?', dataOrder, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const createOrderDetail = (detailOrder) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO order_detail SET ?', detailOrder, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const getAllOrder = (keyword, order, start = '', limit = '') => new Promise((resolve, reject) => {
  if (start !== '' && limit !== '') {
    conn.query(`SELECT * FROM orders WHERE invoice_number LIKE '%${keyword}%' ORDER BY created_at ${order} LIMIT ${start}, ${limit}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  } else {
    conn.query(`SELECT * FROM orders WHERE invoice_number LIKE '%${keyword}%' ORDER BY created_at ${order}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  }
});

const getUserOrder = (userId, keyword, order, start = '', limit = '') => new Promise((resolve, reject) => {
  if (start !== '' && limit !== '') {
    conn.query(`SELECT * FROM orders WHERE id_user = ${userId} && invoice_number LIKE '%${keyword}%' ORDER BY created_at ${order} LIMIT ${start}, ${limit}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  } else {
    conn.query(`SELECT * FROM orders WHERE id_user = ${userId} && invoice_number LIKE '%${keyword}%' ORDER BY created_at ${order}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  }
});

const updateStatusOrder = (orderId, status) => new Promise((resolve, reject) => {
  conn.query(`UPDATE orders SET status = '${status}' WHERE id_orders = ${orderId}`, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

module.exports = {
  createOrder,
  createOrderDetail,
  getAllOrder,
  getUserOrder,
  updateStatusOrder,
};
