const NewUser = require('../NewUser');

describe('NewUser entitiy', () => {
  it('should create NewUser object correctly', async () => {
    // Arrange
    const payload = new NewUser({
      email: 'johndoe@journeymail.com',
      username: 'johndoe',
      password: 'secret',
      fullname: 'John Doe',
    });

    // Action
    const {
      email, username, password, fullname,
    } = new NewUser(payload);

    // Assert
    expect(email).toEqual(payload.email);
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
