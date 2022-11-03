/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const DatabaseHelper = {
  async cleanTable() {
    await pool.User.deleteMany();
    await pool.Authentication.deleteMany();
  },
};

module.exports = DatabaseHelper;
