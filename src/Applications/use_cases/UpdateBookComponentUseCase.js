const NewBookComponent = require('../../Domains/book_components/entities/NewBookComponent');

class UpdateBookComponentUseCase {
  constructor({ bookComponentsValidator, booksRepository, bookComponentsRepository }) {
    this.bookComponentsValidator = bookComponentsValidator;
    this.booksRepository = booksRepository;
    this.bookComponentsRepository = bookComponentsRepository;
  }

  async execute(params, payload, userId) {
    this.bookComponentsValidator.validatePutBookComponentByIdReq(params, payload);

    const { bookId, componentId } = params;
    const newComponent = new NewBookComponent({ ...payload, bookId });

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);
    await this.bookComponentsRepository.getBookComponentById(componentId);

    return this.bookComponentsRepository.updateBookComponentById(componentId, newComponent);
  }
}

module.exports = UpdateBookComponentUseCase;
