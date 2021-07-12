const modelCategory = require('../models/modelCategory');
const helper = require('../helpers/product');

const createCategory = (req, res) => {
  const { category } = req.body;
  const data = {
    category,
  };
  modelCategory
    .createCategory(data)
    .then(() => {
      helper.response(res, 200, 'Data successfully Inserted', data, null);
    })
    .catch((err) => {
      helper.response(res, 500, 'Internal Server error', null, err);
    });
};

const getCategory = (req, res) => {
  modelCategory
    .getCategory()
    .then((result) => {
      const amount = result.length;
      if (amount < 1) {
        helper.response(res, 404, 'Data not found', null);
      } else {
        helper.response(res, 200, 'All data successfully loaded', result, null);
      }
    })
    .catch((err) => {
      helper.response(res, 500, 'Internal Server Error', null, err);
    });
};

const showCategory = (req, res) => {
  const { id } = req.params;
  modelCategory
    .showCategory(id)
    .then((result) => {
      const amount = result.length;
      if (amount < 1) {
        helper.response(res, 404, 'Data not found', null);
      } else {
        helper.response(res, 200, `Succesfully get data with id ${id}`, result, null);
      }
    })
    .catch((err) => {
      helper.response(res, 500, 'Internal Server Error', null, err);
    });
};

const updateCategory = (req, res) => {
  const { category } = req.body;
  const { id } = req.params;
  const data = {
    category,
  };
  modelCategory
    .updateCategory(data, id)
    .then((result) => {
      helper.response(res, 200, `Succesfully update category with id = ${id}`, result, null);
    })
    .catch((err) => {
      helper.response(res, 500, 'Internal Server Error', null, err);
    });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  modelCategory
    .deleteCategory(id)
    .then((result) => {
      helper.response(res, 200, `Succesfully delete data with id ${id}`, result, null);
    })
    .catch((err) => {
      helper.response(res, 500, 'Internal Server Error', null, err);
    });
};

module.exports = {
  createCategory,
  getCategory,
  showCategory,
  updateCategory,
  deleteCategory,
};
