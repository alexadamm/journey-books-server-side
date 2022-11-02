const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(errors) {
    super(errors, 400);
    this.name = 'InvariantError';
    this.status = 'BAD_REQUEST';
  }
}

module.exports = InvariantError;
