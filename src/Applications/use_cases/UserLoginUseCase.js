const NewAuth = require('../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({
    authenticationsValidator,
    usersRepository,
    passwordHasher,
    authenticationTokenManager,
    authenticationsRepository,
  }) {
    this.authenticationsValidator = authenticationsValidator;
    this.usersRepository = usersRepository;
    this.passwordHasher = passwordHasher;
    this.authenticationTokenManager = authenticationTokenManager;
    this.authenticationsRepository = authenticationsRepository;
  }

  async execute(payload) {
    this.authenticationsValidator.validatePostAuthenticationPayload(payload);

    const { username, password } = payload;

    const encryptedPassword = await this.usersRepository.getPasswordByUsername(username);
    await this.passwordHasher.compare(password, encryptedPassword);

    const id = await this.usersRepository.getIdByUsername(username);

    const accessToken = await this.authenticationTokenManager.createAccessToken({ id, username });
    const refreshToken = await this.authenticationTokenManager.createRefreshToken({ id, username });

    await this.authenticationsRepository.addToken(refreshToken);

    return new NewAuth({ accessToken, refreshToken });
  }
}

module.exports = LoginUserUseCase;
