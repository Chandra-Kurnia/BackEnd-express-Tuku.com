const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/product");
const upload = require("../middleware/multer");
const auth = require('../middleware/auth')

// Route target
router
  .get("/", ProductController.getAllProduct)
  .post("/", auth.authenticationAsSeller, upload.single("image"), ProductController.createProduct)
  .get("/show/:id", ProductController.showProduct)
  .get("/category/:category", ProductController.showCategory)
  .put("/:id", auth.authenticationAsSeller, upload.single("image"), ProductController.updateProduct)
  .delete("/:id", ProductController.deleteProduct)
// Export
module.exports = router;
