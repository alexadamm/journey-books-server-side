const { createContainer } = require('instances-container');
const argon2 = require('argon2');
const Hasher = require('../Applications/securities/Hasher');
const HasherArgon = require('./securities/HasherArgon');
const UsersRepository = require('../Domains/users/UsersRepository');
const UsersRepositoryPostgres = require('./repositories/postgres/UsersRepositoryPostgres');
const pool = require('./database/postgres/pool');
const UserRegistration = require('../Applications/use_cases/UserRegistrationUseCase');
const UsersValidator = require('./validator/users');

// creating container
const container = createContainer();

// registering services and repositories
container.register([
  {
    key: Hasher.name,
    Class: HasherArgon,
    parameter: {
      dependencies: [
        {
          concrete: argon2,
        },
      ],
    },
  },
  {
    key: UsersRepository.name,
    Class: UsersRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: UserRegistration.name,
    Class: UserRegistration,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersValidator',
          concrete: UsersValidator,
        },
        {
          name: 'usersService',
          internal: UsersRepository.name,
        },
        {
          name: 'passwordHasher',
          internal: Hasher.name,
        },
      ],
    },
  },
]);

module.exports = container;
