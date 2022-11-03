const Joi = require('joi');

const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const AuthenticationsValidatorJoi = require('../AuthenticationsValidatorJoi');

describe('AuthenticationsValidator', () => {
  describe('post authentication request payload', () => {
    it('should throw InvariantError when payload not contain needed property', () => {
      // Arrange
      const payload = {
        username: 'johndoe',
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validatePostAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when payload did not meet data type specification', () => {
      // Arrange
      const payload = {
        username: 123,
        password: [],
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validatePostAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when username more than 50 character', () => {
      // Arrange
      const payload = {
        username: 'johndoe'.repeat(50),
        password: 'secret',
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validatePostAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when username contain restricted character', () => {
      // Arrange
      const payload = {
        username: 'john doe!',
        password: 'secret',
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validatePostAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when validated', () => {
      // Arrange
      const payload = {
        username: 'johndoe',
        password: 'secret',
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validatePostAuthenticationPayload(payload))
        .not.toThrowError(InvariantError);
    });
  });

  describe('delete authentication request payload', () => {
    it('should throw InvariantError when payload not contain refreshToken', () => {
      // Arrange
      const payload = {};

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validateDeleteAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when refreshToken did not meet data type specification', () => {
      // Arrange
      const payload = {
        refreshToken: 123,
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validateDeleteAuthenticationPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when payload validated successfully', () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      };

      const authenticationsValidator = new AuthenticationsValidatorJoi(Joi);

      // Action and Assert
      expect(() => authenticationsValidator.validateDeleteAuthenticationPayload(payload))
        .not.toThrowError(InvariantError);
    });
  });
});
