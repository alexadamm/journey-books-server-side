const { createContainer } = require('instances-container');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const Hasher = require('../Applications/securities/Hasher');
const HasherArgon = require('./securities/HasherArgon');
const UsersRepository = require('../Domains/users/UsersRepository');
const UsersRepositoryPostgres = require('./repositories/postgres/UsersRepositoryPostgres');
const pool = require('./database/postgres/pool');
const UserRegistration = require('../Applications/use_cases/UserRegistrationUseCase');
const UsersValidator = require('../Applications/validators/UsersValidator');
const UsersValidatorJoi = require('./validators/users/UsersValidatorJoi');
const TokenManager = require('../Applications/securities/TokenManager');
const TokenManagerJwt = require('./securities/TokenManagerJwt');
const AuthenticationsRepository = require('../Domains/authentications/AuthenticationsRepository');
const AuthenticationsRepositoryPostgres = require('./repositories/postgres/AuthenticationsRepositoryPostgres');
const UserLoginUseCase = require('../Applications/use_cases/UserLoginUseCase');
const AuthenticationsValidatorJoi = require('./validators/authentications/AuthenticationsValidatorJoi');
const AuthenticationsValidator = require('../Applications/validators/AuthenticationsValidator');

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
    key: UsersValidator.name,
    Class: UsersValidatorJoi,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
        },
      ],
    },
  },
  {
    key: AuthenticationsValidator.name,
    Class: AuthenticationsValidatorJoi,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
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
          internal: UsersValidator.name,
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
          internal: AuthenticationsValidator.name,
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
