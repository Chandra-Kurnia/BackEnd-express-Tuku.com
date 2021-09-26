const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // console.log(file.size);
    if (file.mimetype === 'image/png' | file.mimetype === 'image/jpeg' | file.mimetype === 'image/jpg') {
      cb(null, process.env.IMAGE_URL);
    } else {
      console.log('wrong extension');
    }
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
});

module.exports = upload;
