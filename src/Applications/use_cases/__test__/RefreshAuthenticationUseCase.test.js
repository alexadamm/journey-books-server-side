const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const TokenManager = require('../../securities/TokenManager');
const AuthenticationsValidator = require('../../validators/AuthenticationsValidator');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshAuthenticaitonUseCase', () => {
  it('should orchestrating the refresh token action correctly', async () => {
    // Arrange
    const payload = {
      refreshToken: 'refreshToken',
    };

    const expectedAccessToken = 'accessToken';

    const mockAuthenticationsValidator = new AuthenticationsValidator();
    const mockTokenManager = new TokenManager();
    const mockAuthenticationsRepository = new AuthenticationsRepository();

    mockAuthenticationsValidator.validatePutAuthenticationPayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationsRepository.checkTokenAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'johndoe', id: '12345678-abcd-abcd-abcd-123456789012' }));
    mockTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAccessToken));

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationsRepository: mockAuthenticationsRepository,
      authenticationsValidator: mockAuthenticationsValidator,
      tokenManager: mockTokenManager,
    });

    // Action
    const accessToken = await refreshAuthenticationUseCase.execute(payload);

    // Assert
    expect(mockTokenManager.verifyRefreshToken)
      .toBeCalledWith(payload.refreshToken);
    expect(mockAuthenticationsRepository.checkTokenAvailability)
      .toBeCalledWith(payload.refreshToken);
    expect(mockTokenManager.decodePayload)
      .toBeCalledWith(payload.refreshToken);
    expect(mockTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'johndoe', id: '12345678-abcd-abcd-abcd-123456789012' });
    expect(accessToken).toEqual('accessToken');
  });
});
