const Joi = require('joi');
const UsersValidatorJoi = require('../UsersValidatorJoi');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');

describe('User requests validator', () => {
  describe('post user request payload', () => {
    it('should throw error when payload not contain needed property', () => {
      // Arrange
      const payload = {
        username: 'abc',
        fullname: 'abc',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw error when payload did not meet data type specification', () => {
      // Arrange
      const payload = {
        email: 'abc',
        username: 123,
        password: 'abc',
        fullname: true,
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      /// Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw error when length of username is more than 50', () => {
      // Arrange
      const payload = {
        email: 'abc@gmail.com',
        username: 'abc'.repeat(50),
        password: 'abc',
        fullname: 'abc',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw error when username contain restricted character', () => {
      // Arrange
      const payload = {
        email: 'abc@gmail.com',
        username: 'abc a',
        password: 'abc',
        fullname: 'abc',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw error when email is not valid', () => {
      // Arrange
      const payload = {
        email: 'abc',
        username: 'johndoe',
        password: 'abc',
        fullname: 'abc',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should not throw error when payload is valid', () => {
      // Arrange
      const payload = {
        email: 'johndoe@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullname: 'John Doe',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validatePostUserPayload(payload))
        .not.toThrowError(InvariantError);
    });
  });

  describe('get user by id request params', () => {
    it('should throw error when params did not meet data type specification', () => {
      // Arrange
      const params = {
        userId: 123,
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validateGetUserByIdParams(params))
        .toThrowError(InvariantError);
    });

    it('should not throw error when params are valid', () => {
      // Arrange
      const params = {
        userId: '12345678-abcd-abcd-abcd-123456789012',
      };

      const usersValidator = new UsersValidatorJoi(Joi);

      // Action and Assert
      expect(() => usersValidator.validateGetUserByIdParams(params))
        .not.toThrowError(InvariantError);
    });
  });
});
