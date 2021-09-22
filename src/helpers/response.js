const response = (res, result, status, error) => {
  const resultPrint = {};
  resultPrint.status = 'success';
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.error = error || null;
  res.status(status).json(resultPrint);
};

const responsePaginate = (res, result, statuscode) => {
  const resultPrint = {};
  resultPrint.status = 'success';
  resultPrint.statusCode = statuscode;
  resultPrint.data = result;
  res.status(statuscode).json(resultPrint);
};

module.exports = {
  response,
  responsePaginate,
};
