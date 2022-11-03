const NewAuth = require('../NewAuth');

describe('NewAuth entity', () => {
  it('should create NewAuth object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };

    // Action
    const newAuth = new NewAuth(payload);

    // Assert
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
