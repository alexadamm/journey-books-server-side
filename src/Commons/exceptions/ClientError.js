class ClientError extends Error {
  constructor(errors, statusCode = 400) {
    super();

    if (this.constructor.name === 'ClientError') {
      throw new Error('Cannot instantiate abstract class');
    }

    this.statusCode = statusCode;
    this.name = 'ClientError';
    this.status = 'CLIENT_ERROR';
    this.errors = errors;
  }
}

module.exports = ClientError;
