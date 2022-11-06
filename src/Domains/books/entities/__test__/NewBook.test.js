const NewBook = require('../NewBook');

describe('NewBook entitiy', () => {
  it('should create NewBook object correctly', async () => {
    // Arrange
    const payload = new NewBook({
      ownerId: '12345678-abcd-abcd-abcd-123456789012',
      title: 'My Journey',
    });

    // Action
    const { ownerId, title } = new NewBook(payload);

    // Assert
    expect(ownerId).toEqual(payload.ownerId);
    expect(title).toEqual(payload.title);
  });
});
