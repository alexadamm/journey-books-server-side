const UserDetail = require('../../../Domains/users/entities/UserDetail');
const NewUser = require('../../../Domains/users/entities/NewUser');
const UsersRepository = require('../../../Domains/users/UsersRepository');
const UsersValidator = require('../../validators/UsersValidator');
const Hasher = require('../../securities/Hasher');
const UserRegistrationUseCase = require('../UserRegistrationUseCase');

describe('UserRegistrationUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      email: 'johndoe@gmail.com',
      fullname: 'John Doe',
      username: 'johndoe',
      password: 'secret',
    };

    const expectedAddedUser = new UserDetail({
      id: '12345678-abcd-abcd-abcd-123456789012',
      email: 'johndoe@gmail.com',
      fullname: 'John Doe',
      username: 'johndoe',
    });

    const mockUsersValidator = new UsersValidator();
    const mockUsersRepository = new UsersRepository();
    const mockHasher = new Hasher();

    mockUsersValidator.validatePostUserPayload = jest.fn()
      .mockImplementation();
    mockUsersRepository.verifyAvailableEmail = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUsersRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockHasher.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUsersRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedUser));

    const userRegistrationUseCase = new UserRegistrationUseCase({
      usersValidator: mockUsersValidator,
      usersService: mockUsersRepository,
      passwordHasher: mockHasher,
    });

    // Action
    const addedUser = await userRegistrationUseCase.execute(useCasePayload);

    // Assert
    expect(addedUser).toStrictEqual(expectedAddedUser);
    expect(mockUsersValidator.validatePostUserPayload).toBeCalledWith(useCasePayload);
    expect(mockUsersRepository.verifyAvailableEmail).toBeCalledWith(useCasePayload.email);
    expect(mockUsersRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockHasher.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUsersRepository.addUser).toBeCalledWith(new NewUser({
      ...useCasePayload,
      password: 'encrypted_password',
    }));
  });
});
