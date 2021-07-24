const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file.size);
    if(file.mimetype === "image/png" | file.mimetype === "image/jpeg" | file.mimetype === "image/jpg"){
      cb(null, "./src/assets/img/Products");
    }else{
      console.log("Wrong extension");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage})

module.exports = upload