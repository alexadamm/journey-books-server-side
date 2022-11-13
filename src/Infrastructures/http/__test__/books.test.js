const request = require('supertest');

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

      // Assert
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
  });
});
