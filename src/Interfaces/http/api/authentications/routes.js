const { Router } = require('express');
const AuthenticationsController = require('./controller');

const authentications = (container) => {
  const authenticationsRouter = Router();
  const authenticationsController = new AuthenticationsController(container);

  authenticationsRouter.post('/', authenticationsController.postAuthenticationController);
  authenticationsRouter.put('/', authenticationsController.putAuthenticationController);

  return authenticationsRouter;
};

module.exports = authentications;
