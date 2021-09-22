const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const userController = require('../controllers/users');
const { registerUpdateFieldRules, LoginFieldRules, UpdateFieldRules } = require('../validation/userValidate');
const validateResult = require('../validation/validationResult');

router
  .post('/', registerUpdateFieldRules(), validateResult, userController.createUser)
  .get('/', userController.getAllUser)
  .get('/:id', userController.showUser)
  .put('/:id', UpdateFieldRules(), validateResult, userController.updateUser)
  .delete('/:id', userController.deleteUser)
  // Auth
  .post('/login', LoginFieldRules(), validateResult, userController.login)
  .get('/activation/:token', userController.activate)
  .get('/checktoken/usertoken', auth.authentication, userController.getuserfromtoken);
module.exports = router;
