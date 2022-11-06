const Joi = require('joi');

const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const BooksValidatorJoi = require('../BooksValidatorJoi');

describe('BooksValidatorJoi', () => {
  describe('post authentication request payload', () => {
    it('should throw InvariantError when payload not contain needed property', () => {
      // Arrange
      const payload = {
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePostBookPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when payload did not meet data type specification', () => {
      // Arrange
      const payload = {
        title: 123,
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePostBookPayload(payload))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when payload validated successfully', () => {
      // Arrange
      const payload = {
        title: 'My Journey',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePostBookPayload(payload))
        .not.toThrowError(InvariantError);
    });
  });
});
