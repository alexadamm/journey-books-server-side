const BookDetail = require('../BookDetail');

describe('BookDetail entitiy', () => {
  it('should create BookDetail object correctly', async () => {
    // Arrange
    const payload = new BookDetail({
      id: '12345678-abcd-abcd-abcd-123456789013',
      owner: 'John Doe',
      title: 'My Journey',
      createdAt: new Date(),
    });

    // Action
    const {
      id, owner, title, createdAt,
    } = new BookDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(owner).toEqual(payload.owner);
    expect(title).toEqual(payload.title);
    expect(createdAt).toEqual(payload.createdAt);
  });
});
