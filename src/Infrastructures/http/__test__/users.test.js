const request = require('supertest');
const UsersTableHelper = require('../../../../tests/UsersTableHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('/users endpoint', () => {
  afterAll(async () => {
    await pool.$disconnect();
  });

  afterEach(async () => {
    await UsersTableHelper.cleanTable();
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      // Arrange
      const payload = {
        email: 'johndoe@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const {
        id, email, username, fullname,
      } = response.body.data.addedUser;
      expect(response.statusCode).toEqual(201);
      expect(response.body.isSuccess).toEqual(true);
      expect(response.body.message).toEqual('User added successfully');
      expect(id).toBeDefined();
      expect(email).toEqual(payload.email);
      expect(username).toEqual(payload.username);
      expect(fullname).toEqual(payload.fullname);
    });

    it('should response 400 when email not available', async () => {
      // Arrange
      await UsersTableHelper.addUser({ email: 'johndoe@gmail.com' });
      const payload = {
        email: 'johndoe@gmail.com',
        username: 'john',
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const { email } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(email).toContain('Email is already registered');
    });

    it('should response 400 when username not available', async () => {
      // Arrange
      await UsersTableHelper.addUser({ username: 'johndoe' });
      const payload = {
        email: 'john@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const { username } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(username).toContain('Username is already taken');
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const payload = {};

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const {
        email, username, fullname, password,
      } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(email).toContain('"email" is required');
      expect(username).toContain('"username" is required');
      expect(fullname).toContain('"fullname" is required');
      expect(password).toContain('"password" is required');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const payload = {
        email: 123,
        username: 123,
        password: {},
        fullname: true,
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const {
        email, username, fullname, password,
      } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(email).toContain('"email" must be a string');
      expect(username).toContain('"username" must be a string');
      expect(fullname).toContain('"fullname" must be a string');
      expect(password).toContain('"password" must be a string');
    });

    it('should response 400 when email is not valid', async () => {
      // Arrange
      const payload = {
        email: 'johndoe',
        username: 'johndoe'.repeat(50),
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const { email } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(email).toContain('"email" must be a valid email');
    });

    it('should response 400 when username more than 50 characters', async () => {
      // Arrange
      const payload = {
        email: 'johndoe@gmail.com',
        username: 'johndoe'.repeat(50),
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const { username } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(username).toContain(
        '"username" length must be less than or equal to 50 characters long',
      );
    });

    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      const payload = {
        email: 'johndoe@gmail.com',
        username: 'johndoe!',
        password: 'secret',
        fullname: 'John Doe',
      };

      const app = await createServer(container);

      // Action
      const response = await request(app).post('/users').send(payload);

      // Assert
      const { username } = response.body.errors;
      expect(response.statusCode).toEqual(400);
      expect(response.body.isSuccess).toEqual(false);
      expect(username).toContain(
        '"username" with value "johndoe!" fails to match the required pattern: /^[\\w]+$/',
      );
    });
  });
});
