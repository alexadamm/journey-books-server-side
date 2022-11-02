const InvariantError = require('../InvariantError');
const ValidationErrorHandler = require('../ValidationErrorHandler');

describe('ValidationErrorHandler', () => {
  it('should throw InvariantError with error details', () => {
    // Arrange
    const validationResult = {
      error: {
        details: [
          {
            context: {
              label: 'message',
            },
            message: 'First validation error message',
          },
          {
            context: {
              label: 'user',
            },
            message: 'Second validation error message',
          },
        ],
      },
    };

    // Action and Assert
    expect(() => ValidationErrorHandler(validationResult)).toThrowError(InvariantError);
  });
});
