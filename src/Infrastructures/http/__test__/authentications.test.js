const request = require('supertest');
const AuthenticationsTableHelper = require('../../../../tests/AuthenticationsTableHelper');
const DatabaseHelper = require('../../../../tests/DatabaseHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('/authentications endpoint', () => {
  afterAll(async () => {
    await pool.$disconnect();
  });

  afterEach(async () => {
    await DatabaseHelper.cleanTable();
  });

  describe('when POST /authentications', () => {
    it('should response 201 and new authentication tokens', async () => {
      // Arrange
      const requestPayload = {
        username: 'johndoe',
        password: 'password',
      };
      const app = await createServer(container);

      await request(app).post('/users').send({ ...requestPayload, email: 'johndoe@gmail.com', fullname: 'John Doe' });

      // Action
      const response = await request(app).post('/authentications').send(requestPayload);

      // Assert
      const { accessToken, refreshToken } = response.body.data;
      expect(response.statusCode).toEqual(201);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Authentication added successfully');
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
    });

    it('should response 401 when username or password incorrect', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
        password: 'secret',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/authentications').send(payload);

      // Assert
      const { message } = response.body.errors;
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(message).toContain('Wrong credentials. Invalid username or password');
    });
  });
});
