const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

router
  .post('/', userController.createUser)
  .get('/', userController.getAllUser)
  .get('/:id', userController.showUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
