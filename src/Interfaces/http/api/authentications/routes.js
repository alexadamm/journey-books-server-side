const { Router } = require('express');
const ServerMiddlewares = require('../../../../Infrastructures/http/middlewares');
const AuthenticationsController = require('./controller');

const authentications = (container) => {
  const authenticationsRouter = Router();
  const authenticationsController = new AuthenticationsController(container);
  const { authenticationHandler } = new ServerMiddlewares(container);

  authenticationsRouter.post('/', authenticationsController.postAuthenticationController);
  authenticationsRouter.put('/', authenticationsController.putAuthenticationController);
  authenticationsRouter.delete(
    '/',
    authenticationHandler,
    authenticationsController.deleteAuthenticationController,
  );

  return authenticationsRouter;
};

module.exports = authentications;
