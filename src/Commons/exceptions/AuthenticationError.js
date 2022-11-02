const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(errors) {
    super(errors, 401);
    this.name = 'AuthenticationError';
    this.status = 'UNAUTHORIZED';
  }
}

module.exports = AuthenticationError;
