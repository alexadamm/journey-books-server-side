const { Router } = require('express');
const ServerMiddlewares = require('../../../../Infrastructures/http/middlewares');
const BooksController = require('./controller');

const books = (container) => {
  const booksRouter = Router();
  const booksController = new BooksController(container);
  const { authenticationHandler } = new ServerMiddlewares(container);

  booksRouter.post('/', authenticationHandler, booksController.postBookController);

  return booksRouter;
};

module.exports = books;
