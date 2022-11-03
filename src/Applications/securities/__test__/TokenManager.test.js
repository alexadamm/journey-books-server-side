const TokenManager = require('../TokenManager');

describe('TokenManager interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const tokenManager = new TokenManager();

    // Action and Assert
    expect(tokenManager.createAccessToken).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(tokenManager.createRefreshToken).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(tokenManager.verifyRefreshToken).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    expect(tokenManager.decodePayload).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
