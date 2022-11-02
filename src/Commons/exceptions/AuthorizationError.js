const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
  constructor(errors) {
    super(errors, 403);
    this.name = 'AuthorizationError';
    this.status = 'FORBIDDEN';
  }
}

module.exports = AuthorizationError;
