class RefreshAuthenticationUseCase {
  constructor({ authenticationsRepository, tokenManager, authenticationsValidator }) {
    this.authenticationsRepository = authenticationsRepository;
    this.tokenManager = tokenManager;
    this.authenticationsValidator = authenticationsValidator;
  }

  async execute(payload) {
    this.authenticationsValidator.validatePutAuthenticationPayload(payload);
    const { refreshToken } = payload;

    await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authenticationsRepository.checkTokenAvailability(refreshToken);

    const { username, id } = await this.tokenManager.decodePayload(refreshToken);

    return this.tokenManager.createAccessToken({ username, id });
  }
}

module.exports = RefreshAuthenticationUseCase;
