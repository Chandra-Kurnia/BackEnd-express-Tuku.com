const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/product");
const upload = require("../middleware/multer");
const auth = require('../middleware/auth')
const redis = require('../middleware/redis')

// Route target
router
  .get("/", redis.chaceAllProduct, ProductController.getAllProduct)
  .post("/", auth.authenticationAsSeller, upload.single("image"), ProductController.createProduct)
  .get("/show/:id", redis.chaceProduct, ProductController.showProduct)
  .get("/category/:category", redis.chaceProductByCateogry, ProductController.showCategory)
  .put("/:id", auth.authenticationAsSeller, upload.single("image"), ProductController.updateProduct)
  .delete("/:id", auth.authenticationAsSeller, ProductController.deleteProduct)
  .get('/clear', redis.clearAllChaceProduct)
// Export
module.exports = router;
