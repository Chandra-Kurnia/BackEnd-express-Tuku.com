/* eslint-disable consistent-return */
const fs = require('fs');
const redis = require('redis');
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
  const data = {
    product_name: productName,
    store_id: req.storeLogin.store_id,
    category,
    color,
    size,
    price,
    quantity,
    status,
    description,
    image: req.file.filename,
  };
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
      console.log('Success');
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
      fs.unlink(
        `./src/assets/uploads/img/products/${req.file.filename}`,
        (error) => {
          if (error) {
            console.log(`Error unlink image product!${error}`);
          }
        },
      );
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
      let imageProduct = currentProduct.image;
      if (req.file !== undefined) {
        fs.unlink(
          `./src/assets/uploads/img/products/${currentProduct.image}`,
          (err) => {
            if (err) {
              console.log(`Error unlink old image product!${err}`);
            }
          },
        );
        imageProduct = req.file.filename;
      }

      if (currentProduct.store_id !== req.storeLogin.store_id) {
        return helpersProduct.response(res, 400, 'You cant update this product');
      }

      const data = {
        product_name: productName,
        category,
        color,
        size,
        price,
        quantity,
        status,
        description,
        image: imageProduct,
        updated_at: new Date(),
      };

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
          fs.unlink(
            `./src/assets/uploads/img/products/${req.file.filename}`,
            (error) => {
              if (error) {
                console.log(`Error unlink image product!${error}`);
              }
            },
          );
        });
    })
    .catch((err) => {
      console.log(`Error! data not found ${err}`);
      fs.unlink(
        `./src/assets/uploads/img/products/${req.file.filename}`,
        (errorr) => {
          if (errorr) {
            console.log(`Error unlink image product!${errorr}`);
          }
        },
      );
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
              console.log(`Error unlink image product!${err}`);
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
