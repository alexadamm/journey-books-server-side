const express = require('express');
const { default: helmet } = require('helmet');

const users = require('../../Interfaces/http/api/users/routes');
const authentications = require('../../Interfaces/http/api/authentications/routes');

const ServerMiddlewares = require('./middlewares');

const createServer = async (container) => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));

  app.use('/users', users(container));
  app.use('/authentications', authentications(container));
  app.get('/', async (req, res) => {
    res.status(200).json({
      isSuccess: true,
      message: 'Journey Books API',
    });
  });

  app.use(ServerMiddlewares.unregisteredRouteHandler);
  app.use(ServerMiddlewares.errorHandler);

  return app;
};

module.exports = createServer;
