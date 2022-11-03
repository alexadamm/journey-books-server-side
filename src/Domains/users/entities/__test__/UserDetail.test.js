const UserDetail = require('../UserDetail');

describe('UserDetail entitiy', () => {
  it('should create UserDetail object correctly', async () => {
    // Arrange
    const payload = new UserDetail({
      id: '12345678-abcd-abcd-abcd-123456789012',
      email: 'johndoe@journeymail.com',
      username: 'johndoe',
      fullname: 'John Doe',
    });

    // Action
    const {
      id, email, username, fullname,
    } = new UserDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(email).toEqual(payload.email);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
