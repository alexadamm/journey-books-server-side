class GetBooksUseCase {
  constructor({ booksRepository }) {
    this.booksRepository = booksRepository;
  }

  async execute(userId) {
    const books = await this.booksRepository.getBooksByUserId(userId);
    return books;
  }
}

module.exports = GetBooksUseCase;
