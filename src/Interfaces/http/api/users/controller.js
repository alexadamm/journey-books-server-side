const UserRegistrationUseCase = require('../../../../Applications/use_cases/UserRegistrationUseCase');

class UsersController {
  constructor(container) {
    this.container = container;

    this.postUserController = this.postUserController.bind(this);
  }

  async postUserController(req, res) {
    const payload = req.body;
    const userRegistrationUseCase = this.container.getInstance(UserRegistrationUseCase.name);
    const addedUser = await userRegistrationUseCase.execute(payload);

    res.status(201).json({
      isSuccess: true,
      message: 'User added successfully',
      data: { addedUser },
    });
  }
}

module.exports = UsersController;
