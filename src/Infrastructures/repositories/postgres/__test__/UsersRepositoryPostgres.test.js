const UsersTableTestHelper = require('../../../../../tests/UsersTableHelper');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const UserDetail = require('../../../../Domains/users/entities/UserDetail');
const pool = require('../../../database/postgres/pool');
const UsersRepositoryPostgres = require('../UsersRepositoryPostgres');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');

describe('UsersServicePrima', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.$disconnect();
  });

  describe('verifyAvailableEmail method', () => {
    it('should throw InvariantError when email not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: 'johndoe@journeymail.com' });
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(
        usersRepository.verifyAvailableEmail('johndoe@journeymail.com'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when email available', async () => {
      // Arrange
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(
        usersRepository.verifyAvailableEmail('johndoe@journeymail.com'),
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('verifyAvailableUsername method', () => {
    it('should throw InvariantError when username not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'johndoe' });
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(usersRepository.verifyAvailableUsername('johndoe')).rejects.toThrowError(
        InvariantError,
      );
    });

    it('should not throw InvariantError when username available', async () => {
      // Arrange
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(usersRepository.verifyAvailableUsername('johndoe')).resolves.not.toThrowError(
        InvariantError,
      );
    });
  });

  describe('addUser method', () => {
    it('should persist add user correctly', async () => {
      // Arrange
      const payload = {
        email: 'johndoe@journeymail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      await usersRepository.addUser(payload);

      // Assertconst
      const user = await UsersTableTestHelper.findUserByUsername(payload.username);
      expect(user).toHaveLength(1);
    });

    it('should return addedUser correctly', async () => {
      // Arrange
      const payload = {
        id: '12345678-abcd-abcd-abcd-123456789012',
        email: 'johndoe@journeymail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      const addedUser = await usersRepository.addUser(payload);

      // Assert
      expect(addedUser).toStrictEqual(
        new UserDetail({
          id: payload.id,
          email: payload.email,
          username: payload.username,
          fullname: payload.fullname,
        }),
      );
    });
  });

  describe('getUsersByUsername method', () => {
    it('should return users correctly', async () => {
      // Arrange
      const payload = {
        id: '12345678-abcd-abcd-abcd-123456789012',
        email: 'johndoe@journeymail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };
      await UsersTableTestHelper.addUser(payload);
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      const users = await usersRepository.getUsersByUsername(payload.username);

      // Assert
      expect(users).toHaveLength(1);
    });
  });

  describe('getUserByUserId method', () => {
    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = '12345678-abcd-abcd-abcd-123456789012';
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(usersRepository.getUserById(userId)).rejects.toThrowError(NotFoundError);
    });

    it('should return user correctly', async () => {
      // Arrange
      const userId = '12345678-abcd-abcd-abcd-123456789012';
      await UsersTableTestHelper.addUser({
        id: '12345678-abcd-abcd-abcd-123456789012',
        username: 'johndoe',
      });
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      const user = await usersRepository.getUserById(userId);

      // Assert
      expect(user).toStrictEqual(
        new UserDetail({
          id: '12345678-abcd-abcd-abcd-123456789012',
          email: 'johndoe@journeymail.com',
          username: 'johndoe',
          fullname: 'John Doe',
        }),
      );
    });
  });

  describe('getIdByUsername method', () => {
    it('should return InvariantError when username does not exist', async () => {
      // Arrange
      const username = 'johndoe';
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(usersRepository.getIdByUsername(username)).rejects.toThrowError(InvariantError);
    });

    it('should return userId correctly', async () => {
      // Arrange
      const username = 'johndoe';
      const id = '12345678-abcd-abcd-abcd-123456789012';
      await UsersTableTestHelper.addUser({ id, username });
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      const userId = await usersRepository.getIdByUsername(username);

      // Assert
      expect(userId).toEqual(id);
    });
  });

  describe('getPasswordByUsername method', () => {
    it('should return AuthenticationError when username does not exist', async () => {
      // Arrange
      const username = 'johndoe';
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action and Assert
      await expect(usersRepository.getPasswordByUsername(username)).rejects.toThrowError(
        AuthenticationError,
      );
    });
    it('should return userPassword correctly', async () => {
      // Arrange
      const username = 'johndoe';
      const password = 'secret';
      await UsersTableTestHelper.addUser({ username, password });
      const usersRepository = new UsersRepositoryPostgres(pool);

      // Action
      const userPassword = await usersRepository.getPasswordByUsername(username);

      // Assert
      expect(userPassword).toEqual(password);
    });
  });
});
