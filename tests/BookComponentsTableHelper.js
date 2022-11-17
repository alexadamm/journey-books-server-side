/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const BookComponentsTableHelper = {
  async findComponentByBookId(bookId) {
    return pool.BookComponent.findMany({ where: { bookId } });
  },

  async addComponent({
    id,
    bookId = '1234578-abcd-abcd-abcd-123456789012',
    content = 'Lorem ipsum',
    latitude = '234.21',
    longitude = '12.32',
  }) {
    if (id) {
      return pool.BookComponent.create({
        data: {
          id,
          bookId,
          content,
          latitude,
          longitude,
        },
      });
    }
    return pool.BookComponent.create({
      data: {
        bookId,
        content,
        latitude,
        longitude,
      },
    });
  },

  async cleanTable() {
    await pool.BookComponent.deleteMany();
  },
};

module.exports = BookComponentsTableHelper;
