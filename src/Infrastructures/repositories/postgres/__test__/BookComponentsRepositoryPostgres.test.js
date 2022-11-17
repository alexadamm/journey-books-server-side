const BookComponentsTableHelper = require('../../../../../tests/BookComponentsTableHelper');
const BooksTableHelper = require('../../../../../tests/BooksTableHelper');
const DatabaseHelper = require('../../../../../tests/DatabaseHelper');
const UsersTableTestHelper = require('../../../../../tests/UsersTableHelper');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const BookComponentDetail = require('../../../../Domains/book_components/entities/BookComponentDetail');
const NewBookComponent = require('../../../../Domains/book_components/entities/NewBookComponent');
const pool = require('../../../database/postgres/pool');
const BookComponentsRepositoryPostgres = require('../BookComponentsRepositoryPostgres');

describe('BookComponentsRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      email: 'johndoe@journeymail.com',
      id: '12345678-abcd-abcd-abcd-123456789012',
      username: 'johndoe',
    });

    await BooksTableHelper.addBook({
      id: '12345678-abcd-abcd-abcd-123456789011',
      ownerId: '12345678-abcd-abcd-abcd-123456789012',
      title: 'A Title',
    });
  });

  afterEach(async () => {
    await DatabaseHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.$disconnect();
  });

  describe('addBookComponent method', () => {
    it('should add a book component to database', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const newBookComponent = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-1.123',
      });

      // Action
      await bookComponentsRepository.addBookComponent(newBookComponent);

      // Assert
      const bookComponents = await BookComponentsTableHelper.findComponentByBookId(
        newBookComponent.bookId,
      );
      expect(bookComponents).toHaveLength(1);
    });

    it('should return added book component', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const newBookComponent = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-1.123',
      });

      // Action
      const addedBookComponent = await bookComponentsRepository.addBookComponent(newBookComponent);

      // Assert
      expect(addedBookComponent.id).toBeDefined();
      expect(addedBookComponent).toBeInstanceOf(BookComponentDetail);
      expect(addedBookComponent.bookId).toEqual(newBookComponent.bookId);
      expect(addedBookComponent.content).toEqual(newBookComponent.content);
      expect(addedBookComponent.longitude).toEqual(newBookComponent.longitude);
      expect(addedBookComponent.latitude).toEqual(newBookComponent.latitude);
      expect(addedBookComponent.createdAt).toBeDefined();
    });
  });

  describe('getBookComponentById method', () => {
    it('should throw NotFoundError if the component does not exist', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const componentId = '12345678-abcd-abcd-abcd-123456789010';

      // Action & Assert
      await expect(bookComponentsRepository.getBookComponentById(componentId)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should return book components by book id', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const newBookComponent = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-1.123',
      });

      const { id } = await BookComponentsTableHelper.addComponent(newBookComponent);

      // Action
      const bookComponent = await bookComponentsRepository.getBookComponentById(id);

      // Assert
      expect(bookComponent).toBeInstanceOf(BookComponentDetail);
      expect(bookComponent.id).toBeDefined();
      expect(bookComponent.bookId).toEqual(newBookComponent.bookId);
      expect(bookComponent.content).toEqual(newBookComponent.content);
      expect(bookComponent.longitude).toEqual(newBookComponent.longitude);
      expect(bookComponent.latitude).toEqual(newBookComponent.latitude);
      expect(bookComponent.createdAt).toBeDefined();
    });
  });

  describe('updateBookComponentById method', () => {
    it('should update the book component and return updated book component detail', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const newBookComponent = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-1.123',
      });

      const { id } = await BookComponentsTableHelper.addComponent(newBookComponent);

      const componentUpdate = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum dolor sit amet',
        longitude: '123.123',
        latitude: '-1.123',
      });

      // Action
      await bookComponentsRepository.updateBookComponentById(id, componentUpdate);

      // Assert
      const bookComponents = await BookComponentsTableHelper.findComponentByBookId(
        newBookComponent.bookId,
      );
      expect(bookComponents).toHaveLength(1);
      expect(bookComponents[0].content).toEqual(componentUpdate.content);
    });
  });

  describe('deleteBookComponentById method', () => {
    it('should delete the book component', async () => {
      // Arrange
      const bookComponentsRepository = new BookComponentsRepositoryPostgres(pool);
      const newBookComponent = new NewBookComponent({
        bookId: '12345678-abcd-abcd-abcd-123456789011',
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-1.123',
      });

      const { id } = await BookComponentsTableHelper.addComponent(newBookComponent);

      // Action
      await bookComponentsRepository.deleteBookComponentById(id);

      // Assert
      const bookComponents = await BookComponentsTableHelper.findComponentByBookId(
        newBookComponent.bookId,
      );
      expect(bookComponents).toHaveLength(0);
    });
  });
});
