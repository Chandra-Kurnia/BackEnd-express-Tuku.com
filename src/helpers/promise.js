const promise = (data, query, conn) => new Promise((resolve, reject) => {
  conn.query(query, data, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  });
});

module.exports = {
  promise,
};
