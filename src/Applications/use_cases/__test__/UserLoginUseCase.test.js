const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const UserLogin = require('../../../Domains/users/entities/UserLogin');
const UsersRepository = require('../../../Domains/users/UsersRepository');
const Hasher = require('../../securities/Hasher');
const TokenManager = require('../../securities/TokenManager');
const AuthenticationValidator = require('../../../Infrastructures/validator/authentications');
const UserLoginUseCase = require('../UserLoginUseCase');

describe('UserLoginUseCase', () => {
  it('should orchestrating the login action correctly', async () => {
    const payload = new UserLogin({
      username: 'johndoe',
      password: 'password',
    });

    const userId = '12345678-abcd-abcd-abcd-123456789012';
    const encryptedPassword = 'encrypted_password';

    const expectedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockAuthenticationValidator = AuthenticationValidator;
    const mockUsersRepository = new UsersRepository();
    const mockHasher = new Hasher();
    const mockTokenManager = new TokenManager();
    const mockAuthenticationsRepository = new AuthenticationsRepository();

    mockAuthenticationValidator.validatePostAuthenticationPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUsersRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve(encryptedPassword));
    mockHasher.compare = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUsersRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve(userId));
    mockTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockAuthenticationsRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const loginUserUseCase = new UserLoginUseCase({
      authenticationsValidator: mockAuthenticationValidator,
      usersRepository: mockUsersRepository,
      passwordHasher: mockHasher,
      authenticationTokenManager: mockTokenManager,
      authenticationsRepository: mockAuthenticationsRepository,
    });

    // Action
    const authentication = await loginUserUseCase.execute(payload);

    // Assert
    expect(authentication).toStrictEqual(expectedAuthentication);
    expect(mockAuthenticationValidator.validatePostAuthenticationPayload).toBeCalledWith(payload);
    expect(mockUsersRepository.getPasswordByUsername).toBeCalledWith(payload.username);
    expect(mockHasher.compare).toBeCalledWith(payload.password, encryptedPassword);
    expect(mockUsersRepository.getIdByUsername).toBeCalledWith(payload.username);
    expect(mockTokenManager.createAccessToken)
      .toBeCalledWith({ id: userId, username: payload.username });
    expect(mockTokenManager.createRefreshToken)
      .toBeCalledWith({ id: userId, username: payload.username });
    expect(mockAuthenticationsRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken);
  });
});
