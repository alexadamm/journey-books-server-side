const BooksRepository = require('../../../Domains/books/BooksRepository');
const BooksValidator = require('../../validators/BooksValidator');
const DeleteBookByIdUseCase = require('../DeleteBookByIdUseCase');

describe('DeleteBookByIdUseCase', () => {
  it('should orchestrating the delete book action correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789013';

    const mockBooksValidator = new BooksValidator();
    const mockBooksRepository = new BooksRepository();

    mockBooksValidator.validateDeleteBookByIdParams = jest.fn().mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBooksRepository.deleteBookById = jest.fn().mockImplementation(() => Promise.resolve());

    const deleteBookByIdUseCase = new DeleteBookByIdUseCase({
      booksRepository: mockBooksRepository,
      booksValidator: mockBooksValidator,
    });

    // Action
    await deleteBookByIdUseCase.execute(params, userId);

    // Assert
    expect(mockBooksValidator.validateDeleteBookByIdParams).toHaveBeenCalledWith(params);
    expect(mockBooksRepository.getBookById).toHaveBeenCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toHaveBeenCalledWith(params.bookId, userId);
    expect(mockBooksRepository.deleteBookById).toHaveBeenCalledWith(params.bookId);
  });
});
