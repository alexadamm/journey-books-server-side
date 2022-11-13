const AuthenticationsRepository = require('../AuthenticationsRepository');

describe('AuthenticationsRepository interface', () => {
  it('should throw error when invoke unimplemented function', async () => {
    // Arrange
    const authenticationsRepository = new AuthenticationsRepository();

    // Action and  Assert
    expect(authenticationsRepository.addToken).rejects.toThrowError(
      'AUTHENTICATIONS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(authenticationsRepository.checkTokenAvailability).rejects.toThrowError(
      'AUTHENTICATIONS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(authenticationsRepository.deleteToken).rejects.toThrowError(
      'AUTHENTICATIONS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
