const InvariantError = require('./InvariantError');

const ValidationErrorHandler = (validationResult) => {
  const errorDetails = validationResult.error.details;
  const errorMessage = [];
  errorDetails
    .forEach((item) => {
      errorMessage.push(item.message);
    });
  throw new InvariantError(errorMessage);
};

module.exports = ValidationErrorHandler;
