class NewAuth {
  constructor(payload) {
    const { accessToken, refreshToken } = payload;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

module.exports = NewAuth;
