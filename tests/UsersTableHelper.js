/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    id = '12345678-abcd-abcd-abcd-123456789012',
    email = 'johndoe@journeymail.com',
    username = 'johndoe',
    password = 'secret',
    fullname = 'John Doe',
  }) {
    await pool.User.create({
      data: {
        id, email, username, password, fullname,
      },
    });
  },

  async findUserByUsername(username) {
    return pool.User.findMany({ where: { username } });
  },

  async cleanTable() {
    await pool.User.deleteMany();
  },
};

module.exports = UsersTableTestHelper;
