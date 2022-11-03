const ClientError = require('../../Commons/exceptions/ClientError');

class ServerMiddlewares {
  static unregisteredRouteHandler(req, res) {
    res.status(404).send({
      isSuccess: false,
      status: 'NOT_FOUND',
      errors: { message: 'Page not found' },
    });
  }

  static errorHandler(err, req, res, next) {
    if (err instanceof ClientError) {
      return res.status(err.statusCode).send({
        isSuccess: false,
        status: err.status,
        errors: err.errors,
      });
    }
    return res.status(500).send({
      isSuccess: false,
      status: 'INTERNAL_SERVER_ERROR',
      errors: { message: 'an error occured on our server' },
    });
  }
}

module.exports = ServerMiddlewares;
