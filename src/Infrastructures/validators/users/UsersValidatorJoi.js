const UsersValidator = require('../../../Applications/validators/UsersValidator');
const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const UsersSchema = require('./UsersSchema');

class UsersValidatorJoi extends UsersValidator {
  constructor(joi) {
    super();
    this.usersSchema = UsersSchema(joi);
  }

  validatePostUserPayload(payload) {
    const validationResult = this.usersSchema.postUserPayloadSchema
      .validate(payload, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validateGetUserByIdParams(params) {
    const validationResult = this.usersSchema.getUserByIdParamsSchema
      .validate(params, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }
}

module.exports = UsersValidatorJoi;
