const UserLogin = require('../UserLogin');

describe('UserLogin entity', () => {
  it('should create UserLogin object correctly', () => {
    // Arrange
    const payload = {
      username: 'johndoe',
      password: 'password',
    };

    // Action
    const userLogin = new UserLogin(payload);

    // Assert
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});
