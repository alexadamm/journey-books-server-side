/* istanbul ignore file */
const argon2 = require('argon2');

const HasherHelper = {
  async hash(plain) {
    return argon2.hash(plain, process.env.SALT);
  },
};

module.exports = HasherHelper;
