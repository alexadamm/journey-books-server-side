class UpdateBookByIdUseCase {
  constructor({ booksValidator, booksRepository }) {
    this.booksValidator = booksValidator;
    this.booksRepository = booksRepository;
  }

  async execute(params, payload, userId) {
    this.booksValidator.validatePutBookByIdReq(params, payload);

    const { bookId } = params;
    const { title } = payload;

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);
    return this.booksRepository.updateBookById(bookId, title);
  }
}

module.exports = UpdateBookByIdUseCase;
