const express = require('express');
const { default: helmet } = require('helmet');

const ServerMiddlewares = require('./middlewares');

const createServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));

  app.use(ServerMiddlewares.unregisteredRouteHandler);

  return app;
};

module.exports = createServer;
