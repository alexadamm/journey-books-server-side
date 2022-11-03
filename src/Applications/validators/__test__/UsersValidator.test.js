const UsersValidator = require('../UsersValidator');

describe('UsersValidator interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersValidator = new UsersValidator();

    // Action and Assert
    expect(usersValidator.validatePostUserPayload).toThrowError('USERS_VALIDATOR.METHOD_NOT_IMPLEMENTED');
    expect(usersValidator.validateGetUserByIdParams).toThrowError('USERS_VALIDATOR.METHOD_NOT_IMPLEMENTED');
  });
});
