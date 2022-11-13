const Hasher = require('../../Applications/securities/Hasher');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class HasherArgon extends Hasher {
  constructor(argon2) {
    super();
    this.argon2 = argon2;
    this.salt = process.env.SALT;
  }

  async hash(plain) {
    return this.argon2.hash(plain, this.salt);
  }

  async compare(plain, encrypted) {
    const result = await this.argon2.verify(encrypted, plain, { salt: this.salt });

    if (!result) {
      throw new AuthenticationError('Wrong credentials. Invalid username or password');
    }
  }
}

module.exports = HasherArgon;
