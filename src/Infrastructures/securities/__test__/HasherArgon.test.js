const argon2 = require('argon2');

const HasherHelper = require('../../../../tests/HasherHelper');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const HasherArgon = require('../HasherArgon');

describe('HasherArgon', () => {
  describe('hash method', () => {
    it('should encrypt plain string correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(argon2, 'hash');
      const password = 'plain_password';
      const hasherArgon = new HasherArgon(argon2);

      // Action
      const encryptedPassword = await hasherArgon.hash(password);

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual(password);
      expect(spyHash).toBeCalledWith(password, process.env.SALT);
    });
  });

  describe('compare method', () => {
    it('should throw AuthenticationError if string not match', async () => {
      // Arrange
      const spyHash = jest.spyOn(argon2, 'verify');
      const password = 'plain_password';
      const hasherArgon = new HasherArgon(argon2);
      const encryptedPassword = await HasherHelper.hash(password);

      // Action and Assert
      expect(hasherArgon.compare('plain_password2', encryptedPassword)).rejects.toThrowError(
        AuthenticationError,
      );
      expect(spyHash).toBeCalledWith(encryptedPassword, 'plain_password2', {
        salt: process.env.SALT,
      });
    });

    it('should not throw AuthenticationError if string match', async () => {
      // Arrange
      const spyHash = jest.spyOn(argon2, 'verify');
      const password = 'plain_password';
      const hasherArgon = new HasherArgon(argon2);
      const encryptedPassword = await HasherHelper.hash(password);

      // Action and Assert
      expect(hasherArgon.compare(password, encryptedPassword)).resolves.not.toThrowError(
        AuthenticationError,
      );
      expect(await hasherArgon.compare(password, encryptedPassword)).toEqual(undefined);
      expect(spyHash).toBeCalledWith(encryptedPassword, password, { salt: process.env.SALT });
    });
  });
});
