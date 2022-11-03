const NewUser = require('../../Domains/users/entities/NewUser');

class UserRegistration {
  constructor({ usersService, passwordHasher, usersValidator }) {
    this.usersValidator = usersValidator;
    this.usersService = usersService;
    this.passwordHasher = passwordHasher;
  }

  async execute(payload) {
    this.usersValidator.validatePostUserPayload(payload);
    const newUser = new NewUser(payload);
    await this.usersService.verifyAvailableEmail(newUser.email);
    await this.usersService.verifyAvailableUsername(newUser.username);
    newUser.password = await this.passwordHasher.hash(newUser.password);
    return this.usersService.addUser(newUser);
  }
}

module.exports = UserRegistration;
