const RefreshAuthenticationUseCase = require('../../../../Applications/use_cases/RefreshAuthenticationUseCase');
const UserLoginUseCase = require('../../../../Applications/use_cases/UserLoginUseCase');
const UserLogoutUseCase = require('../../../../Applications/use_cases/UserLogoutUseCase');

class AuthenticationsController {
  constructor(container) {
    this.container = container;

    this.postAuthenticationController = this.postAuthenticationController.bind(this);
    this.putAuthenticationController = this.putAuthenticationController.bind(this);
    this.deleteAuthenticationController = this.deleteAuthenticationController.bind(this);
  }

  async postAuthenticationController(req, res) {
    const payload = req.body;
    const loginUserUseCase = this.container.getInstance(UserLoginUseCase.name);
    const authentication = await loginUserUseCase.execute(payload);

    res.status(201).json({
      isSuccess: true,
      message: 'Authentication added successfully',
      data: authentication,
    });
  }

  async putAuthenticationController(req, res) {
    const payload = req.body;
    const refreshAuthenticationUseCase = this.container.getInstance(
      RefreshAuthenticationUseCase.name,
    );
    const accessToken = await refreshAuthenticationUseCase.execute(payload);

    res.status(200).json({
      isSuccess: true,
      message: 'Access token created successfully',
      data: { accessToken },
    });
  }

  async deleteAuthenticationController(req, res) {
    const payload = req.body;
    const logoutUserUseCase = this.container.getInstance(UserLogoutUseCase.name);
    await logoutUserUseCase.execute(payload);

    res.status(200).json({
      isSuccess: true,
      message: 'User logout successfully',
    });
  }
}

module.exports = AuthenticationsController;
