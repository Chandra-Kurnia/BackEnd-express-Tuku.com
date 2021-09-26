/* eslint-disable consistent-return */

const fs = require('fs');
const redis = require('redis');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require('../helpers/response');
const modelProduct = require('../models/product');
const helpersProduct = require('../helpers/product');

const client = redis.createClient();

const createProduct = (req, res) => {
  const {
    productName,
    category,
    color,
    size,
    price,
    quantity,
    status,
    description,
  } = req.body;
  let data = {
    product_name: productName,
    store_id: req.storeLogin.store_id,
    category,
    color,
    size,
    price,
    quantity,
    status,
    description,
  };

  if (req.files) {
    if (req.files.image.mimetype !== 'image/jpeg' && req.files.image.mimetype !== 'image/png') {
      return response(res, [], 400, [{ msg: 'Only image is allowed' }]);
    } if (req.files.image.size > 1048576 * 5) {
      return response(res, [], 400, [{ msg: 'Image size max is 5mb' }]);
    }
    const filename = uuidv4() + path.extname(req.files.image.name);
    const savepath = path.join(path.dirname(''), '/src/assets/uploads/img/products', filename);
    req.files.image.mv(savepath);
    data = { ...data, image: filename };
  } else {
    return response(res, [], 400, [{ msg: 'Please select your product image' }]);
  }

  modelProduct
    .createProduct(data)
    .then(() => {
      helpersProduct.response(
        res,
        200,
        'Data successfully inserted',
        data,
        null,
      );
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

// read product
const getAllProduct = (req, res) => {
  let lengthAllProduct = '';
  const {
    order, orderBy, keyword, limit, page,
  } = req.query;
  modelProduct
    .countProduct()
    .then((amountAlLProduct) => {
      lengthAllProduct = amountAlLProduct.length;
    })
    .catch(() => {});
  modelProduct
    .getAllProduct(order, orderBy, keyword, limit, page)
    .then((dataProduct) => {
      const amount = dataProduct.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, 'Data Not Found', null);
      } else {
        helpersProduct.response(
          res,
          200,
          'all data successfully loaded',
          dataProduct,
          null,
          order,
          keyword,
          lengthAllProduct,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

const getByStore = (req, res) => {
  let lengthAllProduct = '';
  const storeId = req.storeLogin.store_id;
  const {
    order, orderBy, keyword, limit, page,
  } = req.query;
  modelProduct
    .countProductStore(storeId)
    .then((amountAlLProduct) => {
      lengthAllProduct = amountAlLProduct.length;
    })
    .catch(() => {});
  modelProduct
    .getByStore(order, orderBy, keyword, limit, page, storeId)
    .then((dataProduct) => {
      const amount = dataProduct.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, 'Data Not Found', null);
      } else {
        helpersProduct.response(
          res,
          200,
          'all data successfully loaded',
          dataProduct,
          null,
          order,
          keyword,
          lengthAllProduct,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

// Show
const showProduct = (req, res) => {
  const { id } = req.params;
  modelProduct
    .showProduct(id)
    .then((product) => {
      const amount = product.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, 'Data Not Found', null);
      } else {
        helpersProduct.response(
          res,
          200,
          `succes get data with id = ${id}`,
          product,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Internal server error', null, err);
    });
};

// Show
const showCategory = (req, res) => {
  const { category } = req.params;
  modelProduct
    .showCategory(category)
    .then((product) => {
      const amount = product.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, 'Data Not Found', null);
      } else {
        client.set(`chaceByCategory/${category}`, JSON.stringify(product));
        helpersProduct.response(
          res,
          200,
          `succes get data with category = ${category}`,
          product,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Internal server error', null, err);
    });
};

// Update
const updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    productName,
    category,
    color,
    size,
    price,
    quantity,
    status,
    description,
  } = req.body;

  modelProduct
    .showProduct(id)
    .then((result) => {
      const currentProduct = result[0];

      if (currentProduct.store_id !== req.storeLogin.store_id) {
        return helpersProduct.response(res, 400, 'You cant update this product');
      }

      let data = {
        product_name: productName,
        category,
        color,
        size,
        price,
        quantity,
        status,
        description,
        updated_at: new Date(),
      };

      if (req.files) {
        if (req.files.image.mimetype !== 'image/jpeg' && req.files.image.mimetype !== 'image/png') {
          return response(res, [], 400, [{ msg: 'Only image is allowed' }]);
        } if (req.files.image.size > 1048576 * 5) {
          return response(res, [], 400, [{ msg: 'Image size max is 5mb' }]);
        }
        const filename = uuidv4() + path.extname(req.files.image.name);
        const savepath = path.join(path.dirname(''), '/src/assets/uploads/img/products', filename);
        req.files.image.mv(savepath);
        data = { ...data, image: filename };
        fs.unlink(`./src/assets/uploads/img/products/${currentProduct.image}`, (err) => {
          if (err) {
            console.log('Error unlink image product');
            console.log(err);
          }
        });
      }

      modelProduct
        .updateProduct(data, id)
        .then((resultData) => {
          helpersProduct.response(
            res,
            200,
            `Successfully updated data product with id ${id}`,
            resultData,
            null,
          );
        })
        .catch((err) => {
          console.log(err);
          helpersProduct.response(res, 500, 'Server error', null, err);
        });
    })
    .catch((err) => {
      console.log(`Error! data not found ${err}`);
    });
};

// Delete
const deleteProduct = (req, res) => {
  const { id } = req.params;
  modelProduct.showProduct(id).then((result) => {
    const dataProduct = result[0];
    modelProduct
      .deleteProduct(id)
      .then((deleteResult) => {
        helpersProduct.response(
          res,
          200,
          `Successfully delete product with id = ${id}`,
          deleteResult,
          null,
        );
        fs.unlink(
          `./src/assets/uploads/img/products/${dataProduct.image}`,
          (err) => {
            if (err) {
              console.log(`Error unlink image product! : ${err}`);
            }
          },
        );
      })
      .catch((err) => {
        helpersProduct.response(res, 500, 'Server error', null, err);
      });
  });
};

// Export
module.exports = {
  getAllProduct,
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
  showCategory,
  getByStore,
};
