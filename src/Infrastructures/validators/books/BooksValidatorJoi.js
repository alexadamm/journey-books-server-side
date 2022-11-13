const BooksValidator = require('../../../Applications/validators/BooksValidator');
const ValidationErrorHandler = require('../../../Commons/exceptions/ValidationErrorHandler');
const BooksSchema = require('./BooksSchema');

class BooksValidatorJoi extends BooksValidator {
  constructor(joi) {
    super();
    this.booksSchema = BooksSchema(joi);
  }

  validatePostBookPayload(payload) {
    const validationResult = this.booksSchema.PostBookSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      ValidationErrorHandler(validationResult);
    }
  }
}

module.exports = BooksValidatorJoi;
