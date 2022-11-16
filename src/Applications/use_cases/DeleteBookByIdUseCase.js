class DeleteBookByIdUseCase {
  constructor({ booksValidator, booksRepository }) {
    this.booksValidator = booksValidator;
    this.booksRepository = booksRepository;
  }

  async execute(params, userId) {
    this.booksValidator.validateDeleteBookByIdParams(params);

    const { bookId } = params;

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);
    return this.booksRepository.deleteBookById(bookId);
  }
}

module.exports = DeleteBookByIdUseCase;
