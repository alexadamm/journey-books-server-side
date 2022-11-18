const BookComponentsValidator = require('../BookComponentsValidator');

describe('BookComponentsValidator interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const bookComponentsValidator = new BookComponentsValidator();

    // Action and Assert
    expect(() => bookComponentsValidator.validatePostBookComponentReq({}, {})).toThrowError(
      'BOOK_COMPONENTS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );
    expect(() => bookComponentsValidator.validateGetBookComponentByIdParams({})).toThrowError(
      'BOOK_COMPONENTS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );
    expect(() => bookComponentsValidator.validatePutBookComponentByIdReq({}, {})).toThrowError(
      'BOOK_COMPONENTS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );
    expect(() => bookComponentsValidator.validateDeleteBookComponentByIdParams({})).toThrowError(
      'BOOK_COMPONENTS_VALIDATOR.METHOD_NOT_IMPLEMENTED',
    );
  });
});
