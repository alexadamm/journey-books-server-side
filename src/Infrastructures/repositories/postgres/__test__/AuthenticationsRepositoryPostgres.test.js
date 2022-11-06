const AuthenticationsTableHelper = require('../../../../../tests/AuthenticationsTableHelper');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const pool = require('../../../database/postgres/pool');
const AuthenticationsRepositoryPostgres = require('../AuthenticationsRepositoryPostgres');

describe('AuthenticationsRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.$disconnect();
  });

  describe('addToken method', () => {
    it('should add token to database', async () => {
      // Arrange
      const authenticationsRepository = new AuthenticationsRepositoryPostgres(pool);
      const expectedToken = 'refreshToken';

      // Action
      await authenticationsRepository.addToken(expectedToken);

      // Assert
      const result = await AuthenticationsTableHelper.findToken(expectedToken);
      expect(result.token).toEqual(expectedToken);
    });
  });

  describe('checkTokenAvailability method', () => {
    it('should throw InvariantError when token is not found', async () => {
      // Arrange
      const expectedToken = 'refreshToken';
      const authenticationsRepository = new AuthenticationsRepositoryPostgres(pool);

      // Action and Assert
      await expect(authenticationsRepository.checkTokenAvailability(expectedToken))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when token is found', async () => {
      // Arrange
      const expectedToken = 'refreshToken';
      await AuthenticationsTableHelper.addToken(expectedToken);
      const authenticationsRepository = new AuthenticationsRepositoryPostgres(pool);

      // Action and Assert
      await expect(authenticationsRepository.checkTokenAvailability(expectedToken))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe('deleteToken method', () => {
    it('should delete token from database', async () => {
    // Arrange
      const expectedToken = 'refreshToken';
      await AuthenticationsTableHelper.addToken(expectedToken);
      const authenticationsRepository = new AuthenticationsRepositoryPostgres(pool);

      // Action
      await authenticationsRepository.deleteToken(expectedToken);

      // Assert
      const result = await AuthenticationsTableHelper.findToken(expectedToken);
      expect(result).toEqual(null);
    });
  });
});
