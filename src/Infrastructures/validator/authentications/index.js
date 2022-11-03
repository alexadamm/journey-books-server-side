const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const { PostAuthenticationSchema, DeleteAuthenticationSchema } = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationSchema.validate(payload, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  },

  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthenticationSchema.validate(payload, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  },
};

module.exports = AuthenticationsValidator;
