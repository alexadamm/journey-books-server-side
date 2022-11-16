class BooksRepository {
  async addBook(ownerId) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getBooksByUserId(userId) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyBookAccessbility(bookId, userId) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getBookById(bookId) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateBookById(bookId, updatedBook) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteBookById(bookId) {
    throw new Error('BOOKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = BooksRepository;
