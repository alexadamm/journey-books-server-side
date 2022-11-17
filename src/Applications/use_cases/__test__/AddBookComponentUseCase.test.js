const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookComponentsRepository = require('../../../Domains/book_components/BookComponentsRepository');
const BookComponentDetail = require('../../../Domains/book_components/entities/BookComponentDetail');
const NewBookComponent = require('../../../Domains/book_components/entities/NewBookComponent');
const BookComponentsValidator = require('../../validators/BookComponentsValidator');
const AddBookComponentUseCase = require('../AddBookComponentUseCase');

describe('AddBookComponentUseCase', () => {
  it('should orchestrating the add book component action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'New Book Component Content',
      latitude: '-6.175392',
      longitude: '106.827153',
    };
    const useCaseParams = {
      bookId: '12345678-abcd-abcd-abcd-123456789013',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789011';
    const expectedAddedBookComponent = new BookComponentDetail({
      id: '12345678-abcd-abcd-abcd-123456789012',
      bookId: '12345678-abcd-abcd-abcd-123456789013',
      content: 'New Book Component Content',
      latitude: '-6.175392',
      longitude: '106.827153',
      createdAt: new Date('2020-08-08T07:07:07.000Z'),
      updatedAt: new Date('2020-08-08T07:07:07.000Z'),
    });

    const mockBookComponentsValidator = new BookComponentsValidator();
    const mockBooksRepository = new BooksRepository();
    const mockBookComponentsRepository = new BookComponentsRepository();

    mockBookComponentsValidator.validatePostBookComponentReq = jest
      .fn()
      .mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.addBookComponent = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedBookComponent));

    const addBookComponentUseCase = new AddBookComponentUseCase({
      bookComponentsValidator: mockBookComponentsValidator,
      booksRepository: mockBooksRepository,
      bookComponentsRepository: mockBookComponentsRepository,
    });

    // Action
    const addedBookComponent = await addBookComponentUseCase.execute(
      useCaseParams,
      useCasePayload,
      userId,
    );

    // Assert
    expect(addedBookComponent).toStrictEqual(expectedAddedBookComponent);
    expect(mockBookComponentsValidator.validatePostBookComponentReq).toBeCalledWith(
      useCaseParams,
      useCasePayload,
    );
    expect(mockBooksRepository.getBookById).toBeCalledWith(useCaseParams.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toBeCalledWith(useCaseParams.bookId, userId);
    expect(mockBookComponentsRepository.addBookComponent).toBeCalledWith(
      new NewBookComponent({ ...useCasePayload, bookId: useCaseParams.bookId }),
    );
  });
});
