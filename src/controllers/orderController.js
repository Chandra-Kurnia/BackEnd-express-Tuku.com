/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
const { v4: uuidv4 } = require('uuid');
const { response, responsePaginate } = require('../helpers/response');
const orderModel = require('../models/orderModel');
const productModel = require('../models/product');

const createOrder = (req, res) => {
  const order = {
    invoice_number: uuidv4(),
    id_user: req.userLogin.id_user,
    phone_number: req.userLogin.phone_number,
    address: req.body.ordersUser.address,
    payment: req.body.ordersUser.payment,
    totalPrice: req.body.ordersUser.totalPrice,
  };
  orderModel
    .createOrder(order)
    .then((result) => {
      const idOrder = result.insertId;
      req.body.products.map((element) => {
        const productOrder = {
          id_order: idOrder,
          id_product: element.id_product,
          item_price: element.price,
          quantity: element.quantity,
        };
        orderModel
          .createOrderDetail(productOrder)
          .then(() => {
            productModel
              .updateProductQuantity(element.id_product, element.quantity)
              .then(() => {
                console.log(`Success updated quantity product, with product_id = ${element.id_product}`);
              })
              .catch((err) => {
                console.log(`Error update quantity product, with product_id = ${element.id_product}`);
                console.log(`Error : ${err}`);
              });
            response(res, [], 200, []);
          })
          .catch((err) => {
            response(res, [], 500, err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
      response(res, [], 500, err);
    });
};

const showAllOrder = async (req, res) => {
  const user = req.userLogin;
  const keyword = req.query.keyword || '';
  let order = req.query.order || '';
  if (order.toUpperCase() === 'ASC') {
    order = 'ASC';
  } else if (order.toUpperCase() === 'DESC') {
    order = 'DESC';
  } else {
    order = 'DESC';
  }
  if (user.role === 'seller') {
    try {
      const data = await orderModel.getAllOrder(keyword, order);
      if (data.length < 1) {
        return response(res, [], 200, []);
      }
      const limit = req.query.limit || 5;
      if (isNaN(limit)) {
        return response(res, [], 400, 'Limit must be number');
      }
      const pages = Math.ceil(data.length / limit);
      let page = req.query.page || 1;
      let nextPage = parseInt(page, 10) + 1;
      let prevPage = parseInt(page, 10) - 1;
      if (nextPage > pages) {
        nextPage = pages;
      }
      if (prevPage < 1) {
        prevPage = 1;
      }
      if (page > pages) {
        page = pages;
      } else if (page < 1) {
        page = 1;
      }
      const start = (page - 1) * limit;
      const pagination = {
        countData: data.length,
        pages,
        limit: parseInt(limit, 10),
        curentPage: parseInt(page, 10),
        nextPage,
        prevPage,
      };
      const dataOrder = await orderModel.getAllOrder(keyword, order, start, limit);
      responsePaginate(res, { ...dataOrder, pagination }, 200);
    } catch (error) {
      response(res, [], 500, error);
    }
  } else {
    try {
      const data = await orderModel.getUserOrder(user.id_user, keyword, order);
      if (data.length < 1) {
        return response(res, [], 200, []);
      }
      const limit = req.query.limit || 5;
      if (isNaN(limit)) {
        return response(res, [], 400, 'Limit must be number');
      }
      const pages = Math.ceil(data.length / limit);
      let page = req.query.page || 1;
      let nextPage = parseInt(page, 10) + 1;
      let prevPage = parseInt(page, 10) - 1;
      if (nextPage > pages) {
        nextPage = pages;
      }
      if (prevPage < 1) {
        prevPage = 1;
      }
      if (page > pages) {
        page = pages;
      } else if (page < 1) {
        page = 1;
      }
      const start = (page - 1) * limit;
      const pagination = {
        countData: data.length,
        pages,
        limit: parseInt(limit, 10),
        curentPage: parseInt(page, 10),
        nextPage,
        prevPage,
      };
      const dataOrder = await orderModel.getUserOrder(user.id_user, keyword, order, start, limit);
      responsePaginate(res, { ...dataOrder, pagination }, 200);
    } catch (error) {
      response(res, [], 500, error);
    }
  }
};

module.exports = {
  createOrder,
  showAllOrder,
};
