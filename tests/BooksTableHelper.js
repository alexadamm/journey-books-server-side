/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const BooksTableHelper = {
  async findBookByOwnerId(ownerId) {
    return pool.Book.findMany({ where: { ownerId } });
  },

  async addBook({ id, ownerId = '12345678-abcd-abcd-abcd-123456789012', title = 'A title' }) {
    if (id) {
      return pool.Book.create({ data: { id, ownerId, title } });
    }
    return pool.Book.create({ data: { ownerId, title } });
  },

  async cleanTable() {
    await pool.Authentication.deleteMany();
  },
};

module.exports = BooksTableHelper;
