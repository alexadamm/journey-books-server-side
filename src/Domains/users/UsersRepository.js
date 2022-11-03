class UsersRepository {
  async verifyAvailableEmail(email) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableUsername(username) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addUser(addUser) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getUsersByUsername(username) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getUserById(userId) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getIdByUsername(username) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getPasswordByUsername(username) {
    throw new Error('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UsersRepository;
