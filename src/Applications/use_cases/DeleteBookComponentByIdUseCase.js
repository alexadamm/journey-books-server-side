class DeleteBookComponentByIdUseCase {
  constructor({ bookComponentsValidator, bookComponentsRepository, booksRepository }) {
    this.bookComponentsValidator = bookComponentsValidator;
    this.bookComponentsRepository = bookComponentsRepository;
    this.booksRepository = booksRepository;
  }

  async execute(params, userId) {
    this.bookComponentsValidator.validateDeleteBookComponentByIdParams(params);

    const { bookId, componentId } = params;

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);
    await this.bookComponentsRepository.getBookComponentById(componentId);

    return this.bookComponentsRepository.deleteBookComponentById(componentId);
  }
}

module.exports = DeleteBookComponentByIdUseCase;
