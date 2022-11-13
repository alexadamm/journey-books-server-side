const NewBook = require('../../../Domains/books/entities/NewBook');
const BooksRepository = require('../../../Domains/books/BooksRepository');
const AddBookUseCase = require('../AddBookUseCase');
const BookDetail = require('../../../Domains/books/entities/BookDetail');
const BooksValidator = require('../../validators/BooksValidator');

describe('AddBookUseCase', () => {
  it('should orchestrating the add book action correctly', async () => {
    // Arrange
    const userId = '12345678-abcd-abcd-abcd-123456789012';
    const payload = {
      title: 'My Journey',
    };

    const expectedAddedBook = new BookDetail({
      id: '12345678-abcd-abcd-abcd-123456789010',
      owner: 'John Doe',
      ...payload,
    });

    const mockBooksValidator = new BooksValidator();
    const mockBooksRepository = new BooksRepository();

    mockBooksValidator.validatePostBookPayload = jest.fn().mockImplementation(() => undefined);
    mockBooksRepository.addBook = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedBook));

    const addBookUseCase = new AddBookUseCase({
      booksValidator: mockBooksValidator,
      booksRepository: mockBooksRepository,
    });

    // Action
    const addedBook = await addBookUseCase.execute(userId);

    // Assert
    expect(addedBook).toStrictEqual(expectedAddedBook);
    expect(mockBooksRepository.addBook).toBeCalledWith(new NewBook({ ownerId: userId }));
  });
});
