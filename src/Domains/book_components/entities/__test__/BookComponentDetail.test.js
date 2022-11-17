const BookComponentDetail = require('../BookComponentDetail');

describe('BookComponentDetail entity', () => {
  it('should create BookComponentDetail object correctly', () => {
    // Arrange
    const payload = {
      id: '12345678-abcd-abcd-abcd-123456789012',
      bookId: '12345678-abcd-abcd-abcd-123456789013',
      content: 'New Book Component Content',
      latitude: '-6.175392',
      longitude: '106.827153',
      createdAt: new Date('2020-08-08T07:07:07.000Z'),
      updatedAt: new Date('2020-08-08T07:07:07.000Z'),
    };

    // Action
    const bookComponentDetail = new BookComponentDetail(payload);

    // Assert
    expect(bookComponentDetail.id).toEqual(payload.id);
    expect(bookComponentDetail.bookId).toEqual(payload.bookId);
    expect(bookComponentDetail.content).toEqual(payload.content);
    expect(bookComponentDetail.latitude).toEqual(payload.latitude);
    expect(bookComponentDetail.longitude).toEqual(payload.longitude);
    expect(bookComponentDetail.createdAt).toEqual(payload.createdAt);
    expect(bookComponentDetail.updatedAt).toEqual(payload.updatedAt);
  });
});
