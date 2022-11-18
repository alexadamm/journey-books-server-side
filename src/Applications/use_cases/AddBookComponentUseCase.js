const NewBookComponent = require('../../Domains/book_components/entities/NewBookComponent');

class AddBookComponentUseCase {
  constructor({ bookComponentsValidator, bookComponentsRepository, booksRepository }) {
    this.bookComponentsValidator = bookComponentsValidator;
    this.bookComponentsRepository = bookComponentsRepository;
    this.booksRepository = booksRepository;
  }

  async execute(params, payload, userId) {
    this.bookComponentsValidator.validatePostBookComponentReq(params, payload);

    const { bookId } = params;
    const newComponent = new NewBookComponent({ ...payload, bookId });

    await this.booksRepository.getBookById(bookId);
    await this.booksRepository.verifyBookAccessbility(bookId, userId);

    return this.bookComponentsRepository.addBookComponent(newComponent);
  }
}

module.exports = AddBookComponentUseCase;
