const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');

class AuthenticationsRepositoryPostgres extends AuthenticationsRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addToken(token) {
    await this.pool.Authentication.create({ data: { token } });
  }

  async checkTokenAvailability(token) {
    const result = await this.pool.Authentication.findUnique({ where: { token } });
    if (!result) {
      throw new NotFoundError({ token: ['Refresh token is not found'] });
    }
  }

  async deleteToken(token) {
    await this.pool.Authentication.delete({ where: { token } });
  }
}
module.exports = AuthenticationsRepositoryPostgres;
