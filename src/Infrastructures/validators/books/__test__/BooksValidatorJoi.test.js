const Joi = require('joi');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const BooksValidatorJoi = require('../BooksValidatorJoi');

describe('BooksValidatorJoi', () => {
  describe('post book request payload', () => {
    it('should throw InvariantError when payload not contain needed property', () => {
      // Arrange
      const payload = {};

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

  describe('get book by id request params', () => {
    it('should throw InvariantError when params not contain needed property', () => {
      // Arrange
      const params = {};

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateGetBookByIdParams(params))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateGetBookByIdParams(params))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when params validated successfully', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateGetBookByIdParams(params))
        .not.toThrowError(InvariantError);
    });
  });

  describe('put book by id request params and body', () => {
    it('should throw InvariantError when params not contain needed property', () => {
      // Arrange
      const params = {};
      const payload = {
        title: 'My Journey',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePutBookByIdReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
      };
      const payload = {
        title: 'My Journey',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePutBookByIdReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when payload not contain needed property', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {};

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePutBookByIdReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when payload did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {
        title: 123,
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePutBookByIdReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when params and payload validated successfully', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {
        title: 'My Journey',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validatePutBookByIdReq(params, payload))
        .not.toThrowError(InvariantError);
    });
  });

  describe('delete book by id request params', () => {
    it('should throw InvariantError when params not contain needed property', () => {
      // Arrange
      const params = {};

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateDeleteBookByIdParams(params))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateDeleteBookByIdParams(params))
        .toThrowError(InvariantError);
    });

    it('should not throw InvariantError when params validated successfully', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };

      const booksValidator = new BooksValidatorJoi(Joi);

      // Action and Assert
      expect(() => booksValidator.validateDeleteBookByIdParams(params))
        .not.toThrowError(InvariantError);
    });
  });
});
