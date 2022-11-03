const AuthenticationsValidator = require('../AuthenticationsValidator');

describe('AuthenticationsValidator interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const authenticationsValidator = new AuthenticationsValidator();

    // Action and Assert
    expect(authenticationsValidator.validatePostAuthenticationPayload).toThrowError('AUTHENTICATIONS_VALIDATOR.METHOD_NOT_IMPLEMENTED');
    expect(authenticationsValidator.validateDeleteAuthenticationPayload).toThrowError('AUTHENTICATIONS_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  });
});
