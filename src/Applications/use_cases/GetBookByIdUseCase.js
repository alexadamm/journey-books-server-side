class GetBookByIdUseCase {
  constructor({ booksValidator, booksRepository }) {
    this.booksValidator = booksValidator;
    this.booksRepository = booksRepository;
  }

  async execute(params, userId) {
    this.booksValidator.validateGetBookByIdParams(params);

    const { bookId } = params;

    const book = await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);

    return book;
  }
}

module.exports = GetBookByIdUseCase;
