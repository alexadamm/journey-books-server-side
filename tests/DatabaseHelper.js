/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const DatabaseHelper = {
  async cleanTable() {
    await pool.BookComponent.deleteMany();
    await pool.Book.deleteMany();
    await pool.Authentication.deleteMany();
    await pool.User.deleteMany();
  },
};

module.exports = DatabaseHelper;
