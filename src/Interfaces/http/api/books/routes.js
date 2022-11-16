const { Router } = require('express');
const ServerMiddlewares = require('../../../../Infrastructures/http/middlewares');
const BooksController = require('./controller');

const books = (container) => {
  const booksRouter = Router();
  const booksController = new BooksController(container);
  const { authenticationHandler } = new ServerMiddlewares(container);

  booksRouter.post('/', authenticationHandler, booksController.postBookController);
  booksRouter.get('/', authenticationHandler, booksController.getBooksController);
  booksRouter.get('/:bookId/', authenticationHandler, booksController.getBookByIdController);
  booksRouter.put('/:bookId/', authenticationHandler, booksController.putBookByIdController);
  booksRouter.delete('/:bookId/', authenticationHandler, booksController.deleteBookByIdController);

  return booksRouter;
};

module.exports = books;
