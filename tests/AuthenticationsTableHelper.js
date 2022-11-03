/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableHelper = {
  async findToken(token) {
    return pool.Authentication.findUnique({ where: { token } });
  },

  async addToken(token) {
    return pool.Authentication.create({ data: { token } });
  },

  async cleanTable() {
    await pool.Authentication.deleteMany();
  },
};

module.exports = AuthenticationsTableHelper;
