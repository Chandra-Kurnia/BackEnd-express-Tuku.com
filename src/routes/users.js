const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");
const {registerUpdateFieldRules, LoginFieldRules, validateResult } = require("../validation/userValidate");

router
  .post("/", registerUpdateFieldRules(), validateResult, userController.createUser)
  .get("/", userController.getAllUser)
  .get("/:id", userController.showUser)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser)
  // Auth
  .post("/login", LoginFieldRules(), validateResult, userController.login);
module.exports = router;
