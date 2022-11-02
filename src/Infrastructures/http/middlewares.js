class ServerMiddlewares {
  static unregisteredRouteHandler(req, res) {
    res.status(404).send({
      isSuccess: false,
      status: 'NOT_FOUND',
      errors: { message: 'Page not found' },
    });
  }
}

module.exports = ServerMiddlewares;
