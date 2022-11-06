const pool = require('../../../database/postgres/pool');
const BooksTableHelper = require('../../../../../tests/BooksTableHelper');
const DatabaseHelper = require('../../../../../tests/DatabaseHelper');
const UsersTableHelper = require('../../../../../tests/UsersTableHelper');
const BooksRepositoryPostgres = require('../BooksRepositoryPostgres');
const NewBook = require('../../../../Domains/books/entities/NewBook');

describe('BooksRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableHelper.addUser(
      { email: 'johndoe@journeymail.com', id: '12345678-abcd-abcd-abcd-123456789012', username: 'johndoe' },
    );
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
});
