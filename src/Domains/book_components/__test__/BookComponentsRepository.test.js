const BookComponentsRepository = require('../BookComponentsRepository');

describe('BookComponentsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const bookComponentsRepository = new BookComponentsRepository();

    // Action & Assert
    await expect(bookComponentsRepository.addBookComponent()).rejects.toThrowError('BOOK_COMPONENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(bookComponentsRepository.getBookComponentById('12345678-abcd-abcd-abcd-123456789012')).rejects.toThrowError('BOOK_COMPONENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(bookComponentsRepository.updateBookComponentById('12345678-abcd-abcd-abcd-123456789012', {})).rejects.toThrowError('BOOK_COMPONENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(bookComponentsRepository.deleteBookComponentById('12345678-abcd-abcd-abcd-123456789012')).rejects.toThrowError('BOOK_COMPONENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
