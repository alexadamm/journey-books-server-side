const TokenManager = require('../../Applications/securities/TokenManager');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');
const ClientError = require('../../Commons/exceptions/ClientError');
const UsersRepository = require('../../Domains/users/UsersRepository');

class ServerMiddlewares {
  constructor(container) {
    this.container = container;

    this.authenticationHandler = this.authenticationHandler.bind(this);
  }

  unregisteredRouteHandler(req, res) {
    res.status(404).send({
      isSuccess: false,
      status: 'NOT_FOUND',
      errors: ['Page not found'],
    });
  }

  errorHandler(err, req, res, next) {
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
      errors: ['an error occured on our server'],
    });
  }

  async authenticationHandler(req, res, next) {
    const authTokenManager = this.container.getInstance(TokenManager.name);
    const usersRepository = this.container.getInstance(UsersRepository.name);

    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader === 'undefined') {
      throw new AuthenticationError(['No token provided']);
    }

    const bearerToken = bearerHeader.split(' ')[1];

    await authTokenManager.verifyAccessToken(bearerToken);
    const { id: userId, username } = await authTokenManager.decodePayload(bearerToken);
    await usersRepository.getUserById(userId);

    req.auth = { userId, username };
    next();
  }
}

module.exports = ServerMiddlewares;
