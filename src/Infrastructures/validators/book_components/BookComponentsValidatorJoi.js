const BookComponentsValidator = require('../../../Applications/validators/BookComponentsValidator');
const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const BookComponentsSchema = require('./BookComponentsSchema');

class BookComponentsValidatorJoi extends BookComponentsValidator {
  constructor(joi) {
    super();
    this.joi = joi;
    this.bookComponentsSchema = BookComponentsSchema(joi);
  }

  validatePostBookComponentReq(params, payload) {
    const validationResult = this.bookComponentsSchema.PostBookComponentParamsSchema.validate(
      params,
      {
        abortEarly: false,
      },
    );

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }

    const validationResult2 = this.bookComponentsSchema.PostBookComponentPayloadSchema.validate(
      payload,
      {
        abortEarly: false,
      },
    );

    if (validationResult2.error) {
      ValidationErrorHandler(validationResult2);
    }
  }

  validateGetBookComponentByIdParams(params) {
    const validationResult = this.bookComponentsSchema.BookComponentParamsSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validatePutBookComponentByIdReq(params, payload) {
    const validationResult = this.bookComponentsSchema.BookComponentParamsSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }

    const validationResult2 = this.bookComponentsSchema.PutBookComponentPayloadSchema.validate(
      payload,
      {
        abortEarly: false,
      },
    );

    if (validationResult2.error) {
      ValidationErrorHandler(validationResult2);
    }
  }

  validateDeleteBookComponentByIdParams(params) {
    const validationResult = this.bookComponentsSchema.BookComponentParamsSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }
}

module.exports = BookComponentsValidatorJoi;
