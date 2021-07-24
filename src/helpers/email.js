const conn = require("../config/db");

const findEmail = (email, role) =>
  new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM ${role} WHERE email = ?`,
      email,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });

module.exports = {
  findEmail
}
