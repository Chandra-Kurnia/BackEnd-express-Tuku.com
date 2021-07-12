const conn = require('../config/db');

const getAllProduct = (order, keyword, limit, page) => {
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
  let baseQuery = 'SELECT products.id_product, products.product_name, category.category, products.color, products.size, products.price, products.quantity, products.status, products.description, products.image, products.created_at, products.updated_at  FROM products INNER JOIN category ON category.id_category = products.category';

  //   Search
  if (keyword) {
    baseQuery += ` WHERE product_name LIKE '%${keyword}%'`;
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

const createProduct = (data) => new Promise((resolve, reject) => {
  conn.query('INSERT INTO products SET ?', data, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

const showProduct = (id) => new Promise((resolve, reject) => {
  conn.query(
    'SELECT * FROM products WHERE id_product= ?', id, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

const updateProduct = (data, id) => new Promise((resolve, reject) => {
  conn.query(
    'UPDATE products SET ? WHERE id_product = ?',
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

const deleteProduct = (id) => new Promise((resolve, reject) => {
  conn.query(
    `DELETE FROM products WHERE id_product = ${id}`,
    (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    },
  );
});

module.exports = {
  getAllProduct,
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
};
