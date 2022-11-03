class TokenManager {
  async createAccessToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async createRefreshToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyRefreshToken(token) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async decodePayload(token) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TokenManager;
