const { createContainer } = require('instances-container');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const Hasher = require('../Applications/securities/Hasher');
const HasherArgon = require('./securities/HasherArgon');
const UsersRepository = require('../Domains/users/UsersRepository');
const UsersRepositoryPostgres = require('./repositories/postgres/UsersRepositoryPostgres');
const pool = require('./database/postgres/pool');
const UserRegistration = require('../Applications/use_cases/UserRegistrationUseCase');
const UsersValidator = require('./validator/users');
const TokenManager = require('../Applications/securities/TokenManager');
const TokenManagerJwt = require('./securities/TokenManagerJwt');
const AuthenticationsRepository = require('../Domains/authentications/AuthenticationsRepository');
const AuthenticationsRepositoryPostgres = require('./repositories/postgres/AuthenticationsRepositoryPostgres');
const UserLoginUseCase = require('../Applications/use_cases/UserLoginUseCase');
const AuthenticationsValidator = require('./validator/authentications');

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
    key: TokenManager.name,
    Class: TokenManagerJwt,
    parameter: {
      dependencies: [
        {
          concrete: jwt,
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
  {
    key: AuthenticationsRepository.name,
    Class: AuthenticationsRepositoryPostgres,
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
  {
    key: UserLoginUseCase.name,
    Class: UserLoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationsValidator',
          concrete: AuthenticationsValidator,
        },
        {
          name: 'usersRepository',
          internal: UsersRepository.name,
        },
        {
          name: 'passwordHasher',
          internal: Hasher.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authenticationsRepository',
          internal: AuthenticationsRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
