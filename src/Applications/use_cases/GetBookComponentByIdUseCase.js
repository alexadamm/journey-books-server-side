class GetBookComponentByIdUseCase {
  constructor({ bookComponentsValidator, bookComponentsRepository, booksRepository }) {
    this.bookComponentsValidator = bookComponentsValidator;
    this.bookComponentsRepository = bookComponentsRepository;
    this.booksRepository = booksRepository;
  }

  async execute(params, userId) {
    this.bookComponentsValidator.validateGetBookComponentByIdParams(params);

    const { bookId, componentId } = params;

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);
    return this.bookComponentsRepository.getBookComponentById(componentId);
  }
}

module.exports = GetBookComponentByIdUseCase;
