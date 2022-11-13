const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const UserDetail = require('../../../Domains/users/entities/UserDetail');
const UsersRepository = require('../../../Domains/users/UsersRepository');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

class UsersRepositoryPrisma extends UsersRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async verifyAvailableEmail(email) {
    const result = await this.pool.User.findUnique({ where: { email }, select: { id: true } });

    if (result) {
      throw new InvariantError({ email: ['Email is already registered'] });
    }
  }

  async verifyAvailableUsername(username) {
    const result = await this.pool.User.findUnique({ where: { username }, select: { id: true } });

    if (result) {
      throw new InvariantError({ username: ['Username is already taken'] });
    }
  }

  async addUser(newUser) {
    const user = await this.pool.User.create({
      data: newUser,
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
      },
    });

    return new UserDetail(user);
  }

  async getUsersByUsername(username) {
    const results = await this.pool.User.findMany({
      where: { username: { contains: username } },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
      },
    });

    return results.map((user) => new UserDetail(user));
  }

  async getUserById(userId) {
    const result = await this.pool.User.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        fullname: true,
      },
    });

    if (!result) {
      throw new NotFoundError({ id: ['User not found'] });
    }

    return new UserDetail(result);
  }

  async getIdByUsername(username) {
    const user = await this.pool.User.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      throw new InvariantError({ username: ['User does not exist'] });
    }

    return user.id;
  }

  async getPasswordByUsername(username) {
    const user = await this.pool.User.findUnique({
      where: { username },
      select: { password: true },
    });

    if (!user) {
      throw new AuthenticationError({
        message: ['Wrong credentials. Invalid username or password'],
      });
    }

    return user.password;
  }
}

module.exports = UsersRepositoryPrisma;
