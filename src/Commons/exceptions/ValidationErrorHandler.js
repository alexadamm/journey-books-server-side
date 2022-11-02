const InvariantError = require('./InvariantError');

const ValidationErrorHandler = (validationResult) => {
  const errorDetails = validationResult.error.details;
  const mappedErrors = { };
  errorDetails
    .forEach((item) => {
      mappedErrors[item.context.label] = [];
      mappedErrors[item.context.label].push(item.message);
    });
  throw new InvariantError(mappedErrors);
};

module.exports = ValidationErrorHandler;
