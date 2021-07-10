const response = (res, status, message, data, err, order, keyword, amount, totalPage) => {
  res.json({
    message,
    status,
    order,
    keyword,
    err,
    amount,
    data,
  });
};

module.exports = {
  response,
};
