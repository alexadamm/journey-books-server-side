const BooksValidator = require('../../validators/BooksValidator');
const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookDetail = require('../../../Domains/books/entities/BookDetail');
const UpdateBookByIdUseCase = require('../UpdateBookByIdUseCase');

describe('UpdateBookByIdUseCase', () => {
  it('should orchestrating the update book action correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
    };
    const payload = {
      title: 'A title',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789013';
    const expectedUpdatedBook = new BookDetail({
      owner: 'John Doe',
      createdAt: '2021-08-08T07:26:17.000Z',
      ...params,
      ...payload,
    });

    const mockBooksValidator = new BooksValidator();
    const mockBooksRepository = new BooksRepository();

    mockBooksValidator.validatePutBookByIdReq = jest.fn().mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBooksRepository.updateBookById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedUpdatedBook));

    const updateBookByIdUseCase = new UpdateBookByIdUseCase({
      booksValidator: mockBooksValidator,
      booksRepository: mockBooksRepository,
    });

    // Action
    const actualResponse = await updateBookByIdUseCase.execute(params, payload, userId);

    // Assert
    expect(actualResponse).toEqual(expectedUpdatedBook);
    expect(mockBooksValidator.validatePutBookByIdReq).toBeCalledWith(params, payload);
    expect(mockBooksRepository.getBookById).toBeCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toBeCalledWith(params.bookId, userId);
    expect(mockBooksRepository.updateBookById).toBeCalledWith(params.bookId, payload.title);
  });
});
