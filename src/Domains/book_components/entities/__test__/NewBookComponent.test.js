const NewBookComponent = require('../NewBookComponent');

describe('NewBookCompnoents entiy', () => {
  it('should create NewBookComponents object correctly', () => {
    // Arrange
    const payload = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      content: 'lorem ipsum dolor sit amet',
      latitude: '-6.175392',
      longitude: '106.827153',
    };

    // Action
    const newComponent = new NewBookComponent(payload);

    // Assert
    expect(newComponent.bookId).toEqual(payload.bookId);
    expect(newComponent.content).toEqual(payload.content);
    expect(newComponent.latitude).toEqual(payload.latitude);
    expect(newComponent.longitude).toEqual(payload.longitude);
  });
});
