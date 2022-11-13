const NewBook = require('../../Domains/books/entities/NewBook');

class AddNoteUseCase {
  constructor({ booksValidator, booksRepository }) {
    this.booksValidator = booksValidator;
    this.booksRepository = booksRepository;
  }

  async execute(ownerId, payload) {
    this.booksValidator.validatePostBookPayload(payload);
    const newBook = new NewBook({ ...payload, ownerId });
    return this.booksRepository.addBook(newBook);
  }
}

module.exports = AddNoteUseCase;
