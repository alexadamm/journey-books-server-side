const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const { PostUserPayloadSchema, GetUserByIdParamsSchema } = require('./schema');

const UsersValidator = {
  validatePostUserPayload: (payload) => {
    const validationResult = PostUserPayloadSchema.validate(payload, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  },

  validateGetUserByIdParams: (params) => {
    const validationResult = GetUserByIdParamsSchema.validate(params, { abortEarly: false });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  },
};

module.exports = UsersValidator;
