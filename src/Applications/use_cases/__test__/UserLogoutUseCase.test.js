const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const AuthenticationsValidator = require('../../validators/AuthenticationsValidator');
const UserLogoutUseCase = require('../UserLogoutUseCase');

describe('UserLogoutUseCase', () => {
  it('should orchestrating the logout action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'refreshToken',
    };

    const mockAuthenticationsValidator = new AuthenticationsValidator();
    const mockAuthenticationsRepository = new AuthenticationsRepository();

    mockAuthenticationsValidator.validateDeleteAuthenticationPayload = jest
      .fn()
      .mockImplementation(() => undefined);
    mockAuthenticationsRepository.checkTokenAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationsRepository.deleteToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const userLogoutUseCase = new UserLogoutUseCase({
      authenticationsRepository: mockAuthenticationsRepository,
      authenticationsValidator: mockAuthenticationsValidator,
    });

    // Action
    await userLogoutUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationsValidator.validateDeleteAuthenticationPayload).toBeCalledWith(
      useCasePayload,
    );
    expect(mockAuthenticationsRepository.checkTokenAvailability).toBeCalledWith(
      useCasePayload.refreshToken,
    );
    expect(mockAuthenticationsRepository.deleteToken).toBeCalledWith(useCasePayload.refreshToken);
  });
});
