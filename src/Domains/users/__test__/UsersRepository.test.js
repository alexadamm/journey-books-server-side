const UsersRepository = require('../UsersRepository');

describe('UsersRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersRepository = new UsersRepository();

    // Action and Assert
    expect(usersRepository.verifyAvailableUsername('')).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.verifyAvailableEmail('')).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.addUser({})).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.getUsersByUsername('username')).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.getUserById('id')).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.getIdByUsername('')).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    expect(usersRepository.getPasswordByUsername()).rejects.toThrowError('USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
