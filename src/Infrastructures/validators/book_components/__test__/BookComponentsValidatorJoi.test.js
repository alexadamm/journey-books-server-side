const Joi = require('joi');
const BooksValidator = require('../../../../Applications/validators/BooksValidator');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const BookComponentsValidatorJoi = require('../BookComponentsValidatorJoi');

describe('BookComponentsValidatorJoi', () => {
  describe('post book request params and body', () => {
    it('should not throw InvariantError when params successfully validated', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {
        content: 'lorem ipsum',
        latitude: '13.122',
        longitude: '-332.11',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePostBookComponentReq(params, payload))
        .not.toThrowError(InvariantError);
    });

    it('should throw InvariantError when params not contain needed property', () => {
      // Arrange
      const params = {};
      const payload = {
        content: 'lorem ipsum',
        latitude: '13.122',
        longitude: '-332.11',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePostBookComponentReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
      };
      const payload = {
        content: 'lorem ipsum',
        latitude: '13.122',
        longitude: '-332.11',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePostBookComponentReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when body not contain needed property', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {};

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePostBookComponentReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when body did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {
        content: 123,
        latitude: false,
        longitude: {},
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePostBookComponentReq(params, payload))
        .toThrowError(InvariantError);
    });
  });

  describe('get book request params', () => {
    it('should not throw InvariantError when params successfully validated', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
        componentId: '12345678-abcd-abcd-abcd-123456789011',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validateGetBookComponentByIdParams(params))
        .not.toThrowError(InvariantError);
    });

    it('should throw InvariantError when params not contain needed property', () => {
      // Arrange
      const params = {};

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validateGetBookComponentByIdParams(params)).toThrowError(
        InvariantError,
      );
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
        componentId: 123,
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validateGetBookComponentByIdParams(params)).toThrowError(
        InvariantError,
      );
    });
  });

  describe('put book request params and body', () => {
    it('should not throw InvariantError when params successfully validated', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
        componentId: '12345678-abcd-abcd-abcd-123456789011',
      };
      const payload = {
        content: 'lorem ipsum',
        latitude: '13.122',
        longitude: '-332.11',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePutBookComponentByIdReq(params, payload))
        .not.toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
      };
      const payload = {
        content: 'lorem ipsum',
        latitude: '13.122',
        longitude: '-332.11',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePutBookComponentByIdReq(params, payload))
        .toThrowError(InvariantError);
    });

    it('should throw InvariantError when body did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
      };
      const payload = {
        content: 123,
        latitude: false,
        longitude: {},
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validatePutBookComponentByIdReq(params, payload))
        .toThrowError(InvariantError);
    });
  });

  describe('delete book request params', () => {
    it('should not throw InvariantError when params successfully validated', () => {
      // Arrange
      const params = {
        bookId: '12345678-abcd-abcd-abcd-123456789012',
        componentId: '12345678-abcd-abcd-abcd-123456789011',
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validateDeleteBookComponentByIdParams(params))
        .not.toThrowError(InvariantError);
    });

    it('should throw InvariantError when params did not meet data type specification', () => {
      // Arrange
      const params = {
        bookId: 123,
        componentId: 123,
      };

      const bookComponentsValidator = new BookComponentsValidatorJoi(Joi);

      // Action and Assert
      expect(() => bookComponentsValidator.validateDeleteBookComponentByIdParams(params))
        .toThrowError(InvariantError);
    });
  });
});
