const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookDetail = require('../../../Domains/books/entities/BookDetail');
const GetBooksUseCase = require('../GetBooksUseCase');

describe('GetBooksUseCase', () => {
  it('should orchestrating the get books action correctly', async () => {
    // Arrange
    const userId = '12345678-abcd-abcd-abcd-123456789012';
    const expectedBooks = [
      new BookDetail({
        id: 'book-1',
        owner: 'johndoe',
        title: 'Book 1',
        createdAt: '2021-08-08T07:07:07.070Z',
      }),
      new BookDetail({
        id: 'book-2',
        owner: 'johndoe',
        title: 'Book 2',
        createdAt: '2022-08-08T07:07:07.070Z',
      }),
    ];

    const mockBooksRepository = new BooksRepository();

    mockBooksRepository.getBooksByUserId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedBooks));

    const getBooksUseCase = new GetBooksUseCase({ booksRepository: mockBooksRepository });

    // Action
    const actualBooks = await getBooksUseCase.execute(userId);

    // Assert
    expect(actualBooks).toEqual(expectedBooks);
    expect(mockBooksRepository.getBooksByUserId).toBeCalledWith(userId);
  });
});
