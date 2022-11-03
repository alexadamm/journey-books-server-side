const UserLoginUseCase = require('../../../../Applications/use_cases/UserLoginUseCase');

class AuthenticationsController {
  constructor(container) {
    this.container = container;

    this.postAuthenticationController = this.postAuthenticationController.bind(this);
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
}

module.exports = AuthenticationsController;
