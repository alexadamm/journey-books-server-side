const jwt = require('jsonwebtoken');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const TokenManagerJwt = require('../TokenManagerJwt');

describe('TokenManagerJwt', () => {
  describe('createAccessToken method', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };
      const spySign = jest.spyOn(jwt, 'sign');
      const tokenManagerJwt = new TokenManagerJwt(jwt);

      // Action
      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      // Assert
      expect(spySign).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_AGE,
      });
      expect(accessToken.length).toEqual(156);
    });
  });

  describe('createRefreshToken method', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };
      const spySign = jest.spyOn(jwt, 'sign');
      const tokenManagerJwt = new TokenManagerJwt(jwt);

      // Action
      const refreshToken = await tokenManagerJwt.createRefreshToken(payload);

      // Assert
      expect(spySign).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken.length).toEqual(133);
    });
  });

  describe('verifyRefreshToken method', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
        password: 'hello',
      };
      const tokenManagerJwt = new TokenManagerJwt(jwt);
      /** use accessToken instead of refreshToken to make it error */
      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      // Action and Assert
      await expect(tokenManagerJwt.verifyRefreshToken(accessToken))
        .rejects.toThrowError(InvariantError);
    });
    it('should not throw InvariantError when verification success', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };
      const tokenManagerJwt = new TokenManagerJwt(jwt);
      const refreshToken = await tokenManagerJwt.createRefreshToken(payload);

      // Action and Assert
      await expect(tokenManagerJwt.verifyRefreshToken(refreshToken))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe('verifyAccessToken method', () => {
    it('should throw AuthenticationError when verification failed', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
        password: 'hello',
      };
      const tokenManagerJwt = new TokenManagerJwt(jwt);

      /** use refreshToken instead of accessToken to make it error */
      const refreshToken = await tokenManagerJwt.createRefreshToken(payload);

      // Action and Assert
      await expect(tokenManagerJwt.verifyAccessToken(refreshToken))
        .rejects.toThrowError(AuthenticationError);
    });
    it('should not throw AuthenticationError when verification success', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };
      const tokenManagerJwt = new TokenManagerJwt(jwt);
      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      // Action and Assert
      await expect(tokenManagerJwt.verifyAccessToken(accessToken))
        .resolves.not.toThrowError(AuthenticationError);
    });
  });

  describe('decodePayload method', () => {
    it('should decode payload successfully', async () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };
      const tokenManagerJwt = new TokenManagerJwt(jwt);
      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      // Action
      const decodedPayload = await tokenManagerJwt.decodePayload(accessToken);

      // Assert
      expect(decodedPayload).toEqual(payload);
    });
  });
});
