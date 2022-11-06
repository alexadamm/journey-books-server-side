/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const BooksTableHelper = {
  async findBookByOwnerId(ownerId) {
    return pool.Book.findMany({ where: { ownerId } });
  },

  async cleanTable() {
    await pool.Authentication.deleteMany();
  },
};

module.exports = BooksTableHelper;
