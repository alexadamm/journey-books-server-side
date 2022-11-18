const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookComponentsRepository = require('../../../Domains/book_components/BookComponentsRepository');
const BookComponentDetail = require('../../../Domains/book_components/entities/BookComponentDetail');
const BookComponentsValidator = require('../../validators/BookComponentsValidator');
const GetBookComponentByIdUseCase = require('../GetBookComponentByIdUseCase');

describe('GetBookComponentByIdUseCase', () => {
  it('should orchestrating the get book component by id actoin correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      componentId: '12345678-abcd-abcd-abcd-123456789013',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789014';

    const expectedComponent = new BookComponentDetail({
      id: '12345678-abcd-abcd-abcd-123456789013',
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      latitude: '-6.175392',
      longitude: '49.879167',
      updatedAt: '2021-08-08T07:26:17.000Z',
      createdAt: '2021-08-08T07:26:17.000Z',
    });

    const mockBookComponentsValidator = new BookComponentsValidator();
    const mockBooksRepository = new BooksRepository();
    const mockBookComponentsRepository = new BookComponentsRepository();

    mockBookComponentsValidator.validateGetBookComponentByIdParams = jest
      .fn()
      .mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.getBookComponentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedComponent));

    const getBookComponentByIdUseCase = new GetBookComponentByIdUseCase({
      bookComponentsValidator: mockBookComponentsValidator,
      booksRepository: mockBooksRepository,
      bookComponentsRepository: mockBookComponentsRepository,
    });

    // Action
    const actualComponent = await getBookComponentByIdUseCase.execute(params, userId);

    // Assert
    expect(actualComponent).toStrictEqual(expectedComponent);
    expect(mockBookComponentsValidator.validateGetBookComponentByIdParams).toHaveBeenCalledWith(
      params,
    );
    expect(mockBooksRepository.getBookById).toHaveBeenCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toHaveBeenCalledWith(params.bookId, userId);
    expect(mockBookComponentsRepository.getBookComponentById).toHaveBeenCalledWith(
      params.componentId,
    );
  });
});
