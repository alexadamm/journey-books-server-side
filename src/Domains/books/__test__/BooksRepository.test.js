const BooksRepository = require('../BooksRepository');

describe('BooksRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const booksRepository = new BooksRepository();

    // Action and Assert
    expect(booksRepository.addBook('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.addBook('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.getBooksByUserId('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.verifyBookAccessbility('', '')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.getBookById('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.updateBookById('', {})).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    expect(booksRepository.deleteBookById('')).rejects.toThrowError(
      'BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
