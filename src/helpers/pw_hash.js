const bcrypt = require("bcrypt");

function encrypt(textPw){
  return bcrypt.hash(textPw, 10, (err, hash) => {
    return hash;
  });
};

const compare = (textPw, encryptPw) => {
  bcrypt.compare(textPw, encryptPw, (err, result) => {
    result;
  });
};

module.exports = {
  encrypt,
  compare,
};
