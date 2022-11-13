const AuthenticationsValidator = require('../../../Applications/validators/AuthenticationsValidator');
const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const AuthenticationsSchema = require('./AuthenticationsSchema');

class AuthenticationsValidatorJoi extends AuthenticationsValidator {
  constructor(joi) {
    super();
    this.authenticationsSchema = AuthenticationsSchema(joi);
  }

  validatePostAuthenticationPayload(payload) {
    const validationResult = this.authenticationsSchema.PostAuthenticationSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validateDeleteAuthenticationPayload(payload) {
    const validationResult = this.authenticationsSchema.DeleteAuthenticationSchema.validate(
      payload,
      { abortEarly: false },
    );

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validatePutAuthenticationPayload(payload) {
    const validationResult = this.authenticationsSchema.PutAuthenticationSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }
}

module.exports = AuthenticationsValidatorJoi;
