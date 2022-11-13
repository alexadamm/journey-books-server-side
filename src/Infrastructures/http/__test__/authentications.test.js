const request = require('supertest');
const AuthenticationsTableHelper = require('../../../../tests/AuthenticationsTableHelper');
const DatabaseHelper = require('../../../../tests/DatabaseHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
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

      await request(app)
        .post('/users')
        .send({ ...requestPayload, email: 'johndoe@gmail.com', fullname: 'John Doe' });

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

  describe('when PUT /authentications', () => {
    it('should response 200 and access token', async () => {
      // Arrange
      const app = await createServer(container);

      const { refreshToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app).put('/authentications').send({ refreshToken });

      // Assert
      const { accessToken } = response.body.data;
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('Access token created successfully');
      expect(accessToken).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const app = await createServer(container);

      // Action
      const response = await request(app).put('/authentications').send({});

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('"refreshToken" is required');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);

      // Action
      const response = await request(app).put('/authentications').send({ refreshToken: 123 });

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('"refreshToken" must be a string');
    });

    it('should response 400 when refresh token not found', async () => {
      // Arrange
      const app = await createServer(container);

      const { refreshToken: token } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      await AuthenticationsTableHelper.deleteToken(token);

      // Action
      const response = await request(app).put('/authentications').send({ refreshToken: token });

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('Invalid token');
    });
  });

  describe('when DELETE /authentications', () => {
    it('should response 200 and success message', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken, refreshToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .delete('/authentications')
        .send({ refreshToken })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('User logout successfully');
    });

    it('should response 401 when access user unauthenticated', async () => {
      // Arrange
      const app = await createServer(container);

      // Action
      const response = await request(app).delete('/authentications').send({});

      // Assert
      expect(response.statusCode).toEqual(401);
      expect(response.body.isSuccess).toEqual(false);
      expect(response.body.errors.message).toEqual('No token provided');
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .delete('/authentications')
        .send({})
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('"refreshToken" is required');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );

      // Action
      const response = await request(app)
        .delete('/authentications')
        .send({ refreshToken: 123 })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('"refreshToken" must be a string');
    });

    it('should response 400 when refresh token not found', async () => {
      // Arrange
      const app = await createServer(container);

      const { accessToken, refreshToken: token } = await ServerTestHelper.newUser(
        { request, app },
        { username: 'johndoe' },
      );
      await AuthenticationsTableHelper.deleteToken(token);

      // Action
      const response = await request(app)
        .delete('/authentications')
        .send({ refreshToken: token })
        .set('Authorization', `Bearer ${accessToken}`);

      // Assert
      const { refreshToken } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(refreshToken).toContain('Invalid token');
    });
  });
});
