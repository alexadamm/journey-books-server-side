const { Router } = require('express');
const ServerMiddlewares = require('../../../../Infrastructures/http/middlewares');
const BookComponentsController = require('./controller');

const bookComponents = (container) => {
  const bookComponentsRouter = Router();
  const bookComponentsController = new BookComponentsController(container);
  const { authenticationHandler } = new ServerMiddlewares(container);

  bookComponentsRouter.post(
    '/:bookId/components',
    authenticationHandler,
    bookComponentsController.postBookComponentsController,
  );
  bookComponentsRouter.get(
    '/:bookId/components/:componentId',
    authenticationHandler,
    bookComponentsController.getBookComponentByIdController,
  );
  bookComponentsRouter.put(
    '/:bookId/components/:componentId',
    authenticationHandler,
    bookComponentsController.putBookComponentByIdController,
  );
  bookComponentsRouter.delete(
    '/:bookId/components/:componentId',
    authenticationHandler,
    bookComponentsController.deleteBookComponentByIdController,
  );

  return bookComponentsRouter;
};

module.exports = bookComponents;
