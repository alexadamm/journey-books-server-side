const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookComponentsRepository = require('../../../Domains/book_components/BookComponentsRepository');
const BookComponentsValidator = require('../../validators/BookComponentsValidator');
const DeleteBookComponentByIdUseCase = require('../DeleteBookComponentByIdUseCase');

describe('DeleteBookComponentByIdUseCase', () => {
  it('should orchestrating the delete book component action correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      componentId: '12345678-abcd-abcd-abcd-123456789011',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789012';

    const mockBookComponentsValidator = new BookComponentsValidator();
    const mockBooksRepository = new BooksRepository();
    const mockBookComponentsRepository = new BookComponentsRepository();

    mockBookComponentsValidator.validateDeleteBookComponentByIdParams = jest
      .fn()
      .mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.getBookComponentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.deleteBookComponentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteBookComponentByIdUseCase = new DeleteBookComponentByIdUseCase({
      bookComponentsRepository: mockBookComponentsRepository,
      booksRepository: mockBooksRepository,
      bookComponentsValidator: mockBookComponentsValidator,
    });

    // Action
    await deleteBookComponentByIdUseCase.execute(params, userId);

    // Assert
    expect(mockBookComponentsValidator.validateDeleteBookComponentByIdParams).toHaveBeenCalledWith(
      params,
    );
    expect(mockBooksRepository.getBookById).toHaveBeenCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toHaveBeenCalledWith(params.bookId, userId);
    expect(mockBookComponentsRepository.getBookComponentById).toHaveBeenCalledWith(
      params.componentId,
    );
    expect(mockBookComponentsRepository.deleteBookComponentById).toHaveBeenCalledWith(
      params.componentId,
    );
  });
});
