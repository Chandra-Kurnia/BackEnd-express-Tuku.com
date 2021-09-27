/* eslint-disable max-len */
// const redis = require('redis');

// const client = redis.createClient();
// const helper = require('../helpers/product');

// client.on('error', (err) => {
//   console.log(err);
// });

// const chaceAllProduct = (req, res, next) => {
//   const {
//     order, orderBy, limit, page,
//   } = req.query;
//   client.get(
//     `product-${order}-${orderBy}-${limit}-${page}`,
//     (err, result) => {
//       if (result) {
//         const data = JSON.parse(result);
//         helper.response(
//           res,
//           200,
//           'Succesfully get data from redis',
//           data,
//           null,
//           order,
//         );
//       } else {
//         next();
//       }
//     },
//   );
// };

// const chaceProduct = (req, res, next) => {
//   const { id } = req.params;
//   client.get(`chaceProduct/${id}`, (err, result) => {
//     if (result) {
//       const data = JSON.parse(result);
//       helper.response(
//         res,
//         200,
//         `Successfully get data from redis with id ${id}`,
//         data,
//       );
//     } else {
//       next();
//     }
//   });
// };

// const chaceProductByCateogry = (req, res, next) => {
//   const { category } = req.params;
//   client.get(`chaceByCategory/${category}`, (err, result) => {
//     const data = JSON.parse(result);
//     if (result) {
//       helper.response(res, 200, `Successfully get data from redis with category ${category}`, data);
//     } else {
//       next();
//     }
//   });
// };

// const clearAllChaceProduct = (req, res, next) => {
//   client.flushall((err, success) => {
//     if (err) {
//       helper.response(res, 500, 'Clear chace failed', null, err);
//     } else {
//       helper.response(res, 200, 'All chace succesfuly clear', success);
//     }
//   });
// };

// module.exports = {
//   chaceAllProduct,
//   chaceProduct,
//   clearAllChaceProduct,
//   chaceProductByCateogry,
// };
