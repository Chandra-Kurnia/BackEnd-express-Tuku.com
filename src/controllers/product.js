const modelProduct = require('../models/product');
const helpersProduct = require('../helpers/product');

// create product
const createProduct = (req, res) => {
  // get request
  const {
    productName,
    color,
    size,
    price,
    quantity,
    status,
    description,
    image,
  } = req.body;
  // Validation
  const statusUp = status.toUpperCase();
  if (
    (productName === '')
    || (color === '')
    || (size === '')
    || (price === '')
    || (quantity === '')
    || isNaN(quantity)
    || (status === '')
    || (statusUp !== 'NEW')
    || (statusUp !== 'FORMER')
    || (description === '')
    || (image === '')
  ) {
    helpersProduct.response(
      res,
      400,
      'Bad Request, you inserted a wrong input',
    );
  } else {
    // Validation succes
    const data = {
      product_name: productName,
      color,
      size,
      price,
      quantity,
      status,
      description,
      image,
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
      })
      .catch((err) => {
        helpersProduct.response(res, 500, 'Server error', null, err);
      });
  }
};

// read product
const getAllProduct = (req, res) => {
  const {
    order, keyword, limit, page,
  } = req.query;

  modelProduct
    .getAllProduct(order, keyword, limit, page)
    .then((dataProduct) => {
      const amount = dataProduct.length;
      if ((amount == null) || (amount === '')) {
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
          amount,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

// Show
const showProduct = (req, res) => {
  const { id } = req.params.id;

  modelProduct
    .showProduct(id)
    .then((product) => {
      res.json({
        message: `success get data with id = ${id}`,
        product,
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
};

// Update
const updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    productName,
    color,
    size,
    price,
    quantity,
    status,
    description,
    image,
  } = req.body;
  // Validation
  const statusUp = status.toUpperCase();
  if (
    (productName === '')
    || (color === '')
    || (size === '')
    || (price === '')
    || (quantity === '')
    || isNaN(quantity)
    || (status === '')
    || (statusUp !== 'NEW')
    || (statusUp !== 'FORMER')
    || (description === '')
    || (image === '')
  ) {
    helpersProduct.response(
      res,
      400,
      'Bad Request, you inserted a wrong input',
    );
  } else {
    const data = {
      productName,
      color,
      size,
      price,
      quantity,
      status,
      description,
      image,
      updated_at: new Date(),
    };

    modelProduct
      .updateProduct(data, id)
      .then((result) => {
        helpersProduct.response(
          res,
          200,
          `Successfully updated data product with id ${id}`,
          result,
          null,
        );
      })
      .catch((err) => {
        helpersProduct.response(res, 500, 'Server error', null, err);
      });
  }
};

// Delete
const deleteProduct = (req, res) => {
  const { id } = req.params;
  modelProduct
    .deleteProduct(id)
    .then((result) => {
      helpersProduct.response(
        res,
        200,
        `Successfully delete product with id = ${id}`,
        result,
        null,
      );
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

// Export
module.exports = {
  getAllProduct,
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
};
