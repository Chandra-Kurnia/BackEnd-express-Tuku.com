const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");
const {registerUpdateFieldRules, LoginFieldRules} = require("../validation/userValidate");
const validateResult = require('../validation/validationResult')

router
  .post("/", registerUpdateFieldRules(), validateResult, userController.createUser)
  .get("/", userController.getAllUser)
  .get("/:id", userController.showUser)
  .put("/:id", registerUpdateFieldRules(), validateResult, userController.updateUser)
  .delete("/:id", userController.deleteUser)
  // Auth
  .post("/login", LoginFieldRules(), validateResult, userController.login)
  .get("/activation/:token", userController.activate)
module.exports = router;
