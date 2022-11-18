const request = require('supertest');
const BooksTableHelper = require('../../../../tests/BooksTableHelper');
const DatabaseHelper = require('../../../../tests/DatabaseHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/books endpoint', () => {
  afterEach(async () => {
    await DatabaseHelper.cleanTable();
  });

  describe('when POST /books', () => {
    it('should response 201 and new book', async () => {
      // Arrange
      const payload = {
        title: 'Clean Code',
      };
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .post('/books')
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // AssertBook
      const {
        id, title, owner, createdAt,
      } = response.body.data.addedBook;
      expect(response.statusCode).toEqual(201);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Book added successfully');
      expect(id).toBeDefined();
      expect(title).toEqual(payload.title);
      expect(owner).toEqual('johndoe');
      expect(createdAt).toBeDefined();
    });

    it('should throw 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      // Action
      const response = await request(app).post('/books');

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('No token provided');
    });

    it('should response 400 when payload not contain needed properties', async () => {
      // Arrange
      const payload = {};
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .post('/books')
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('"title" is required');
    });

    it('should response 400 when payload not meet data type specification', async () => {
      // Arrange
      const payload = {
        title: 123,
      };
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .post('/books')
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('"title" must be a string');
    });
  });

  describe('when GET /books', () => {
    it('should response 200 and list of books', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      await BooksTableHelper.addBook({ ownerId: userId, title: 'First Book' });
      await BooksTableHelper.addBook({ ownerId: userId, title: 'Second Book' });

      // Action
      const response = await request(app)
        .get('/books')
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.data.books).toHaveLength(2);
      expect(response.body.data.books[0].title).toEqual('First Book');
      expect(response.body.data.books[1].title).toEqual('Second Book');
    });

    it('should throw 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      // Action
      const response = await request(app).get('/books');

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('No token provided');
    });
  });

  describe('when GET /books/{bookId}/', () => {
    it('should response 200 and book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .get(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.data.book.title).toEqual('First Book');
    });

    it('should throw 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .get(`/books/${bookId}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('No token provided');
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .get(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('Book not found');
    });

    it('should response 403 when try to get unaccessible book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'foo', email: 'foo@journeymail.com' },
      );

      // Action
      const response = await request(app)
        .get(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('You have no permission to access this source');
    });
  });

  describe('when PUT /books/{bookId}', () => {
    it('should response 200 and updated book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: 'Updated Book' })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.data.updatedBook.title).toEqual('Updated Book');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app).put(`/books/${bookId}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('No token provided');
    });

    it('should response 400 when payload not contain needed property', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .put(`/books/${bookId}`)
        .send({})
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('"title" is required');
    });

    it('should response 400 when payload not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: 123 })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('"title" must be a string');
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: 'Updated Book' })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('Book not found');
    });

    it('should response 403 when try to edit unaccessible book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'foo', email: 'foo@journeymail.com' },
      );

      // Action
      const response = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: 'Updated Book' })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('You have no permission to access this source');
    });
  });

  describe('when DELETE /books/{bookId}', () => {
    it('should response 200 and deleted book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Book deleted successfully');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      // Action
      const response = await request(app).delete(`/books/${bookId}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('No token provided');
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('Book not found');
    });

    it('should response 403 when try to delete unaccessible book', async () => {
      // Arrange
      const app = await createServer(container);
      const { userId } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });
      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'foo', email: 'foo@journeymail.com' },
      );

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { errors } = response.body;
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
      expect(errors).toContain('You have no permission to access this source');
    });
  });
});
