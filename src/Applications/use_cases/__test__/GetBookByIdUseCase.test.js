const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookDetail = require('../../../Domains/books/entities/BookDetail');
const BooksValidator = require('../../validators/BooksValidator');
const GetBookByIdUseCase = require('../GetBookByIdUseCase');

describe('GetBookByIdUseCase', () => {
  it('shouold orchestrating the get book by id action correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-`123456789012',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789013';

    const expectedBook = new BookDetail({
      id: '12345678-abcd-abcd-abcd-123456789013',
      title: 'My Journey',
      owner: 'johndoe',
      components: [{
        id: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      }],
      createdAt: '2021-08-08T07:26:17.000Z',
    });

    const mockBooksValidator = new BooksValidator();
    const mockBooksRepository = new BooksRepository();

    mockBooksValidator.validateGetBookByIdParams = jest.fn()
      .mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedBook));
    mockBooksRepository.verifyBookAccessbility = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const getBookByIdUseCase = new GetBookByIdUseCase({
      booksRepository: mockBooksRepository,
      booksValidator: mockBooksValidator,
    });

    // Action
    const actualBook = await getBookByIdUseCase.execute(params, userId);

    // Assert
    expect(actualBook).toEqual(expectedBook);
    expect(mockBooksValidator.validateGetBookByIdParams).toHaveBeenCalledWith(params);
    expect(mockBooksRepository.getBookById).toHaveBeenCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toHaveBeenCalledWith(params.bookId, userId);
  });
});
