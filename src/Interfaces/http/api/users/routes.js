const { Router } = require('express');
const UsersController = require('./controller');

const users = (container) => {
  const usersRouter = Router();
  const usersController = new UsersController(container);

  usersRouter.post('/', usersController.postUserController);

  return usersRouter;
};

module.exports = users;
