const BooksRepository = require('../BooksRepository');

describe('BooksRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const booksRepository = new BooksRepository();

    // Action and Assert
    expect(booksRepository.addBook('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
