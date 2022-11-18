const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookComponentsRepository = require('../../../Domains/book_components/BookComponentsRepository');
const BookComponentDetail = require('../../../Domains/book_components/entities/BookComponentDetail');
const NewBookComponent = require('../../../Domains/book_components/entities/NewBookComponent');
const BookComponentsValidator = require('../../validators/BookComponentsValidator');
const UpdateBookComponentUseCase = require('../UpdateBookComponentUseCase');

describe('UpdateBookComponentUseCase', () => {
  it('should orchestrating the update book component action correctly', async () => {
    // Arrange
    const params = {
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      componentId: '12345678-abcd-abcd-abcd-123456789011',
    };
    const payload = {
      content: 'new content',
      latitude: '-6.175392',
      longitude: '106.827153',
    };
    const userId = '12345678-abcd-abcd-abcd-123456789013';
    const expectedUpdatedBookComponent = new BookComponentDetail({
      id: '12345678-abcd-abcd-abcd-123456789011',
      bookId: '12345678-abcd-abcd-abcd-123456789012',
      content: 'new content',
      latitude: '-6.175392',
      longitude: '106.827153',
      createdAt: new Date('2020-08-08T07:07:07.000Z'),
      updatedAt: new Date('2020-08-08T07:07:07.000Z'),
    });

    const mockBookComponentsValidator = new BookComponentsValidator();
    const mockBooksRepository = new BooksRepository();
    const mockBookComponentsRepository = new BookComponentsRepository();

    mockBookComponentsValidator.validatePutBookComponentByIdReq = jest
      .fn()
      .mockImplementation(() => undefined);
    mockBooksRepository.getBookById = jest.fn().mockImplementation(() => Promise.resolve());
    mockBooksRepository.verifyBookAccessbility = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.getBookComponentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockBookComponentsRepository.updateBookComponentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedUpdatedBookComponent));

    const updateBookComponentUseCase = new UpdateBookComponentUseCase({
      bookComponentsValidator: mockBookComponentsValidator,
      booksRepository: mockBooksRepository,
      bookComponentsRepository: mockBookComponentsRepository,
    });

    // Action
    const actualResponse = await updateBookComponentUseCase.execute(params, payload, userId);

    // Assert
    expect(actualResponse).toStrictEqual(expectedUpdatedBookComponent);
    expect(mockBookComponentsValidator.validatePutBookComponentByIdReq).toBeCalledWith(
      params,
      payload,
    );
    expect(mockBooksRepository.getBookById).toBeCalledWith(params.bookId);
    expect(mockBooksRepository.verifyBookAccessbility).toBeCalledWith(params.bookId, userId);
    expect(mockBookComponentsRepository.getBookComponentById).toBeCalledWith(params.componentId);
    expect(mockBookComponentsRepository.updateBookComponentById).toBeCalledWith(
      params.componentId,
      new NewBookComponent({
        ...payload,
        bookId: params.bookId,
      }),
    );
  });
});
