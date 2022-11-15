const pool = require('../../../database/postgres/pool');
const BooksTableHelper = require('../../../../../tests/BooksTableHelper');
const DatabaseHelper = require('../../../../../tests/DatabaseHelper');
const UsersTableHelper = require('../../../../../tests/UsersTableHelper');
const BooksRepositoryPostgres = require('../BooksRepositoryPostgres');
const NewBook = require('../../../../Domains/books/entities/NewBook');
const AuthorizationError = require('../../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const BookDetail = require('../../../../Domains/books/entities/BookDetail');

describe('BooksRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableHelper.addUser({
      email: 'johndoe@journeymail.com',
      id: '12345678-abcd-abcd-abcd-123456789012',
      username: 'johndoe',
    });
  });

  afterEach(async () => {
    await DatabaseHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.$disconnect();
  });

  describe('addBook method', () => {
    it('should add a book to database', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const newBook = new NewBook({
        title: 'My Journey',
        ownerId: '12345678-abcd-abcd-abcd-123456789012',
      });

      // Action
      await booksRepository.addBook(newBook);

      // Assert
      const results = await BooksTableHelper.findBookByOwnerId(newBook.ownerId);
      expect(results).toHaveLength(1);
    });

    it('should return added book', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const newBook = new NewBook({
        title: 'My Journey',
        ownerId: '12345678-abcd-abcd-abcd-123456789012',
      });

      // Action
      const addedBook = await booksRepository.addBook(newBook);

      // Assert
      expect(addedBook.id).toBeDefined();
      expect(addedBook.owner).toEqual('johndoe');
      expect(addedBook.title).toEqual(newBook.title);
      expect(addedBook.createdAt).toBeDefined();
    });
  });

  describe('getBooksByUserId method', () => {
    it('should return all books of a user', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const ownerId = '12345678-abcd-abcd-abcd-123456789012';
      await BooksTableHelper.addBook({ title: 'First Journey' });
      await BooksTableHelper.addBook({ title: 'Second Journey' });

      // Action
      const books = await booksRepository.getBooksByUserId(ownerId);

      // Assert
      expect(books).toHaveLength(2);
    });

    it('should return empty array if the user has no book', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const ownerId = '12345678-abcd-abcd-abcd-123456789012';

      const books = await booksRepository.getBooksByUserId(ownerId);

      // Assert
      expect(books).toHaveLength(0);
    });
  });

  describe('verifyBooksAccessbility method', () => {
    it('should throw AuthorizationError when the book is not owned by the user', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const userId = '12345678-abcd-abcd-abcd-123456789013';
      await UsersTableHelper.addUser({ email: 'foo@journeymail.com', id: userId, username: 'foo' });
      const { id } = await BooksTableHelper.addBook({
        title: 'First Journey',
        ownerId: '12345678-abcd-abcd-abcd-123456789012',
      });

      // Action & Assert
      await expect(booksRepository.verifyBookAccessbility(id, userId)).rejects.toThrowError(
        AuthorizationError,
      );
    });

    it('should not throw AuthorizationError when the book is owned by the user', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const userId = '12345678-abcd-abcd-abcd-123456789012';
      const { id } = await BooksTableHelper.addBook({ title: 'First Journey' });

      // Action & Assert
      await expect(booksRepository.verifyBookAccessbility(id, userId)).resolves.not.toThrowError(
        AuthorizationError,
      );
    });
  });

  describe('getBookById method', () => {
    it('should throw NotFoundError if the book does not exist', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action & Assert
      await expect(booksRepository.getBookById(bookId)).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError and return book details when book exist', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const { id } = await BooksTableHelper.addBook({ title: 'First Journey' });

      // Action
      const book = await booksRepository.getBookById(id);

      // Assert
      expect(book).toBeDefined();
      expect(book).toBeInstanceOf(BookDetail);
    });
  });

  describe('updateBookById method', () => {
    it('should update book and return updated book detail', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const { id } = await BooksTableHelper.addBook({ title: 'First Journey' });
      const bookUpdate = {
        title: 'Updated Journey',
      };

      // Action
      const updatedBook = await booksRepository.updateBookById(id, bookUpdate.title);

      // Assert
      expect(updatedBook).toBeDefined();
      expect(updatedBook).toBeInstanceOf(BookDetail);
      expect(updatedBook.title).toBe(bookUpdate.title);
    });
  });

  describe('deleteBookById method', () => {
    it('should delete book from database', async () => {
      // Arrange
      const booksRepository = new BooksRepositoryPostgres(pool);
      const ownerId = '12345678-abcd-abcd-abcd-123456789012';
      const { id } = await BooksTableHelper.addBook({
        title: 'First Journey',
        ownerId: '12345678-abcd-abcd-abcd-123456789012',
      });

      // Action
      await booksRepository.deleteBookById(id);

      // Assert
      const books = await BooksTableHelper.findBookByOwnerId(ownerId);
      expect(books).toHaveLength(0);
    });
  });
});
