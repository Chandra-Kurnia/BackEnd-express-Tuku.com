const express = require("express");

const router = express.Router();
const storeController = require("../controllers/store");
const categoryController = require("../controllers/categoryController");
const validateResult = require("../validation/validationResult");
const { createUpdateStoreRules } = require("../validation/storeValidate");

// Route target
router
  .post("/", createUpdateStoreRules(), validateResult, storeController.createStore)
  .post("/category", categoryController.createCategory)
  .get("/", storeController.getAllStore)
  .get("/category", categoryController.getCategory)
  .get("/:id", storeController.showStore)
  .get("/category/:id", categoryController.showCategory)
  .put("/:id", createUpdateStoreRules(), validateResult, storeController.updateStore)
  .put("/category/:id", categoryController.updateCategory)
  .delete("/category/:id", categoryController.deleteCategory)
  .delete("/:id", storeController.deleteStore);

// Export
module.exports = router;
