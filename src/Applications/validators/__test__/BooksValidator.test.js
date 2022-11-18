const BooksValidator = require('../BooksValidator');

describe('BooksValidator interface', () => {
  it('should throw error when invoke abstract behavior', () => {
    // Arrange
    const booksValidator = new BooksValidator();

    // Action and Assert
    expect(() => booksValidator.validatePostBookPayload({})).toThrowError(
      'BOOKS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );

    expect(() => booksValidator.validateGetBookByIdParams({})).toThrowError(
      'BOOKS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );

    expect(() => booksValidator.validatePutBookByIdReq({}, {})).toThrowError(
      'BOOKS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );

    expect(() => booksValidator.validateDeleteBookByIdParams({})).toThrowError(
      'BOOKS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );
  });
});
