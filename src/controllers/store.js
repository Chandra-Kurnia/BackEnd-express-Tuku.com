const modelStore = require('../models/store');
const helpersProduct = require('../helpers/product');

const createStore = (req, res) => {
  const {
    owner, email, phoneNumber, storeName, pass,
  } = req.body;
  if (!owner || !email || !phoneNumber || !pass || !storeName) {
    helpersProduct.response(res, 400, 'Bad Request, your inserted a wrong input');
  } else {
    // Validation succes
    //   pw hash
    const password = pass;
    const data = {
      owner,
      email,
      phone_number: phoneNumber,
      store_name: storeName,
      password,
    };

    modelStore
      .createStore(data)
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

const getAllStore = (req, res) => {
  const {
    order, keyword, limit, page,
  } = req.query;

  modelStore
    .getAllStore(order, keyword, limit, page)
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
          amount,
        );
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

const showStore = (req, res) => {
  const { id } = req.params;
  modelStore
    .showStore(id)
    .then((product) => {
      const amount = product.length;
      if (amount < 1) {
        helpersProduct.response(res, 404, 'Data Not Found', null);
      } else {
        helpersProduct.response(res, 200, `succes get data with id = ${id}`, product);
      }
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Internal server error', null, err);
    });
};

const updateStore = (req, res) => {
  const { id } = req.params;
  const {
    owner, email, phoneNumber, storeName, pass, storeDesc,
  } = req.body;
  if (!owner || !email || !phoneNumber || !storeName || !storeDesc) {
    helpersProduct.response(res, 400, 'Bad Request, you inserted a wrong input !');
  } else {
    // Password hash
    const password = pass;
    const data = {
      owner,
      email,
      phone_number: phoneNumber,
      store_name: storeName,
      password,
      store_desc: storeDesc,
      updated_at: new Date(),
    };
    modelStore
      .updateStore(data, id)
      .then((result) => {
        helpersProduct.response(
          res,
          200,
          `Successfully updated data store with id ${id}`,
          result,
          null,
        );
      })
      .catch((err) => {
        helpersProduct.response(res, 500, 'Server error', null, err);
      });
  }
};

const deleteStore = (req, res) => {
  const { id } = req.params;
  modelStore
    .deleteStore(id)
    .then((result) => {
      helpersProduct.response(
        res,
        200,
        `Successfully delete store with id = ${id}`,
        result,
        null,
      );
    })
    .catch((err) => {
      helpersProduct.response(res, 500, 'Server error', null, err);
    });
};

module.exports = {
  createStore,
  getAllStore,
  showStore,
  updateStore,
  deleteStore,
};
