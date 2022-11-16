const BooksValidator = require('../../../Applications/validators/BooksValidator');
const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const BooksSchema = require('./BooksSchema');

class BooksValidatorJoi extends BooksValidator {
  constructor(joi) {
    super();
    this.booksSchema = BooksSchema(joi);
  }

  validatePostBookPayload(payload) {
    const validationResult = this.booksSchema.BookPayloadSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validateGetBookByIdParams(params) {
    const validationResult = this.booksSchema.BookIdSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }

  validatePutBookByIdReq(params, payload) {
    const validationResult = this.booksSchema.BookIdSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }

    const validationResult2 = this.booksSchema.BookPayloadSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult2.error) {
      ValidationErrorHandler(validationResult2);
    }
  }

  validateDeleteBookByIdParams(params) {
    const validationResult = this.booksSchema.BookIdSchema.validate(params, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }
}

module.exports = BooksValidatorJoi;
