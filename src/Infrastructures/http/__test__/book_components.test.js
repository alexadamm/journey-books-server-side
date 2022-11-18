const request = require('supertest');
const BookComponentsTableHelper = require('../../../../tests/BookComponentsTableHelper');
const BooksTableHelper = require('../../../../tests/BooksTableHelper');
const DatabaseHelper = require('../../../../tests/DatabaseHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/books/{bookId}/components endpoint', () => {
  afterEach(async () => {
    await DatabaseHelper.cleanTable();
  });

  describe('when POST /books/{bookId}/components', () => {
    it('should response 201 and added book component', async () => {
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

      const payload = {
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .post(`/books/${bookId}/components`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(201);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Component added successfully');
      expect(response.body.data.addedComponent.content).toEqual('Lorem ipsum');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });
      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const payload = {
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app).post(`/books/${bookId}/components`).send(payload);

      // Assert
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.message).toEqual('No token provided');
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

      const payload = {};

      // Action
      const response = await request(app)
        .post(`/books/${bookId}/components`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.content).toContain('"content" is required');
      expect(response.body.errors.longitude).toContain('"longitude" is required');
      expect(response.body.errors.latitude).toContain('"latitude" is required');
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

      const payload = {
        content: 123,
        longitude: true,
        latitude: {},
      };

      // Action
      const response = await request(app)
        .post(`/books/${bookId}/components`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.content).toContain('"content" must be a string');
      expect(response.body.errors.longitude).toContain('"longitude" must be a string');
      expect(response.body.errors.latitude).toContain('"latitude" must be a string');
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      const payload = {
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .post(`/books/${bookId}/components`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 403 when try to post to unaccessible book', async () => {
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

      const payload = {
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .post(`/books/${bookId}/components`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
    });
  });

  describe('when GET /books/{bookId}/components/{componentId}', () => {
    it('should response 200 and get book component', async () => {
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

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      // Action
      const response = await request(app)
        .get(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Component retrieved successfully');
      expect(response.body.data.component.content).toEqual('Lorem ipsum');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });

      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      // Action
      const response = await request(app).get(`/books/${bookId}/components/${componentId}`);

      // Assert
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.message).toEqual('No token provided');
    });

    it('should response 400 when params not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      const bookId = '123';

      const componentId = '123';

      // Action
      const response = await request(app)
        .get(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      const { id } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId: id,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .get(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 404 when component not found', async () => {
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

      const componentId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .get(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 403 when try to get unaccessible book component', async () => {
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

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'foo', email: 'foo@journeymail.com' },
      );

      // Action
      const response = await request(app)
        .get(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
    });
  });

  describe('when PUT /books/{bookId}/components/{componentId}', () => {
    it('should response 200 and update book component', async () => {
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

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const payload = {
        content: 'Lorem ipsum dolor sit amet',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .put(`/books/${bookId}/components/${componentId}`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Component updated successfully');
      expect(response.body.data.component.content).toEqual('Lorem ipsum dolor sit amet');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });

      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const payload = {
        content: 'Lorem ipsum dolor sit amet',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .put(`/books/${bookId}/components/${componentId}`)
        .send(payload);

      // Assert
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.message).toEqual('No token provided');
    });

    it('should response 400 when params not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      const bookId = '123';

      const componentId = '123';

      const payload = {
        content: 'Lorem ipsum dolor sit amet',
        longitude: '123.123',
        latitude: '-123.123',
      };

      // Action
      const response = await request(app)
        .put(`/books/${bookId}/components/${componentId}`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.bookId).toContain('"bookId" must be a valid GUID');
      expect(response.body.errors.componentId).toContain('"componentId" must be a valid GUID');
    });

    it('should response 400 when payload not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      const bookId = '12345678-1234-1234-1234-123456789012';

      const componentId = '12345678-1234-1234-1234-123456789012';

      const payload = {
        content: 123,
        longitude: 123,
        latitude: 123,
      };

      // Action
      const response = await request(app)
        .put(`/books/${bookId}/components/${componentId}`)
        .send(payload)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.content).toContain('"content" must be a string');
      expect(response.body.errors.longitude).toContain('"longitude" must be a string');
      expect(response.body.errors.latitude).toContain('"latitude" must be a string');
    });
  });

  describe('when DELETE /books/{bookId}/components/{componentId}', () => {
    it('should response 200', async () => {
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

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Component deleted successfully');
    });

    it('should response 401 when auth token not provided', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId } = await ServerTestHelper.newUser({ request, app }, { username: 'johndoe' });

      const { id: bookId } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      // Action
      const response = await request(app).delete(`/books/${bookId}/components/${componentId}`);

      // Assert
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.message).toEqual('No token provided');
    });

    it('should response 404 when book not found', async () => {
      // Arrange
      const app = await createServer(container);

      const { userId, accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      const { id } = await BooksTableHelper.addBook({
        ownerId: userId,
        title: 'First Book',
      });

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId: id,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const bookId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 404 when component not found', async () => {
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

      const componentId = '12345678-abcd-abcd-abcd-123456789012';

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.body.isSuccess).toEqual(false);
    });

    it('should response 403 when try to delete unaccessible book component', async () => {
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

      const { id: componentId } = await BookComponentsTableHelper.addComponent({
        bookId,
        content: 'Lorem ipsum',
        longitude: '123.123',
        latitude: '-123.123',
      });

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'foo', email: 'foo@journeymail.com' },
      );

      // Action
      const response = await request(app)
        .delete(`/books/${bookId}/components/${componentId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(403);
      expect(response.body.isSuccess).toEqual(false);
    });
  });
});
