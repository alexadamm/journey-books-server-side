const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  constructor(errors) {
    super(errors, 404);
    this.name = 'NotFoundError';
    this.status = 'NOT_FOUND';
  }
}

module.exports = NotFoundError;
