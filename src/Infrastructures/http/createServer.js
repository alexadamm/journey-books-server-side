const express = require('express');
const { default: helmet } = require('helmet');

const users = require('../../Interfaces/http/api/users/routes');
const authentications = require('../../Interfaces/http/api/authentications/routes');

const ServerMiddlewares = require('./middlewares');
const books = require('../../Interfaces/http/api/books/routes');
const bookComponents = require('../../Interfaces/http/api/book_components/routes');

const createServer = async (container) => {
  const app = express();

  const middlewares = new ServerMiddlewares(container);

  app.use(express.json());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));

  app.use('/users', users(container));
  app.use('/authentications', authentications(container));
  app.use('/books', books(container));
  app.use('/books', bookComponents(container));
  app.get('/', async (req, res) => {
    res.status(200).json({
      isSuccess: true,
      message: 'Journey Books API',
    });
  });

  app.use(middlewares.unregisteredRouteHandler);
  app.use(middlewares.errorHandler);

  return app;
};

module.exports = createServer;
