class UserLogoutUseCase {
  constructor({ authenticationsValidator, authenticationsRepository }) {
    this.authenticationsValidator = authenticationsValidator;
    this.authenticationsRepository = authenticationsRepository;
  }

  async execute(payload) {
    this.authenticationsValidator.validateDeleteAuthenticationPayload(payload);
    const { refreshToken } = payload;
    await this.authenticationsRepository.checkTokenAvailability(refreshToken);
    await this.authenticationsRepository.deleteToken(refreshToken);
  }
}

module.exports = UserLogoutUseCase;
