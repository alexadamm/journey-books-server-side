const { createContainer } = require('instances-container');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const Hasher = require('../Applications/securities/Hasher');
const HasherArgon = require('./securities/HasherArgon');
const UsersRepository = require('../Domains/users/UsersRepository');
const UsersRepositoryPostgres = require('./repositories/postgres/UsersRepositoryPostgres');
const pool = require('./database/postgres/pool');
const UserRegistrationUseCase = require('../Applications/use_cases/UserRegistrationUseCase');
const UsersValidator = require('../Applications/validators/UsersValidator');
const UsersValidatorJoi = require('./validators/users/UsersValidatorJoi');
const TokenManager = require('../Applications/securities/TokenManager');
const TokenManagerJwt = require('./securities/TokenManagerJwt');
const AuthenticationsRepository = require('../Domains/authentications/AuthenticationsRepository');
const AuthenticationsRepositoryPostgres = require('./repositories/postgres/AuthenticationsRepositoryPostgres');
const UserLoginUseCase = require('../Applications/use_cases/UserLoginUseCase');
const AuthenticationsValidatorJoi = require('./validators/authentications/AuthenticationsValidatorJoi');
const AuthenticationsValidator = require('../Applications/validators/AuthenticationsValidator');
const BooksRepository = require('../Domains/books/BooksRepository');
const BooksRepositoryPostgres = require('./repositories/postgres/BooksRepositoryPostgres');
const AddBookUseCase = require('../Applications/use_cases/AddBookUseCase');
const BooksValidator = require('../Applications/validators/BooksValidator');
const BooksValidatorJoi = require('./validators/books/BooksValidatorJoi');
const RefreshAuthenticationUseCase = require('../Applications/use_cases/RefreshAuthenticationUseCase');
const UserLogoutUseCase = require('../Applications/use_cases/UserLogoutUseCase');
const GetBooksUseCase = require('../Applications/use_cases/GetBooksUseCase');
const GetBookByIdUseCase = require('../Applications/use_cases/GetBookByIdUseCase');
const UpdateBookByIdUseCase = require('../Applications/use_cases/UpdateBookByIdUseCase');
const DeleteBookByIdUseCase = require('../Applications/use_cases/DeleteBookByIdUseCase');
const AddBookComponentUseCase = require('../Applications/use_cases/AddBookComponentUseCase');
const BookComponentsValidator = require('../Applications/validators/BookComponentsValidator');
const BookComponentsValidatorJoi = require('./validators/book_components/BookComponentsValidatorJoi');
const BookComponentsRepository = require('../Domains/book_components/BookComponentsRepository');
const BookComponentsRepositoryPostgres = require('./repositories/postgres/BookComponentsRepositoryPostgres');
const GetBookComponentByIdUseCase = require('../Applications/use_cases/GetBookComponentByIdUseCase');
const UpdateBookComponentUseCase = require('../Applications/use_cases/UpdateBookComponentUseCase');
const DeleteBookComponentByIdUseCase = require('../Applications/use_cases/DeleteBookComponentByIdUseCase');

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
    key: BooksValidator.name,
    Class: BooksValidatorJoi,
    parameter: {
      dependencies: [
        {
          concrete: Joi,
        },
      ],
    },
  },
  {
    key: BookComponentsValidator.name,
    Class: BookComponentsValidatorJoi,
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
  {
    key: BooksRepository.name,
    Class: BooksRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: BookComponentsRepository.name,
    Class: BookComponentsRepositoryPostgres,
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
    key: UserRegistrationUseCase.name,
    Class: UserRegistrationUseCase,
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
  {
    key: AddBookUseCase.name,
    Class: AddBookUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'booksValidator',
          internal: BooksValidator.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: AddBookComponentUseCase.name,
    Class: AddBookComponentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'bookComponentsValidator',
          internal: BookComponentsValidator.name,
        },
        {
          name: 'bookComponentsRepository',
          internal: BookComponentsRepository.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: GetBooksUseCase.name,
    Class: GetBooksUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: GetBookByIdUseCase.name,
    Class: GetBookByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'booksValidator',
          internal: BooksValidator.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: GetBookComponentByIdUseCase.name,
    Class: GetBookComponentByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'bookComponentsValidator',
          internal: BookComponentsValidator.name,
        },
        {
          name: 'bookComponentsRepository',
          internal: BookComponentsRepository.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateBookByIdUseCase.name,
    Class: UpdateBookByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'booksValidator',
          internal: BooksValidator.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateBookComponentUseCase.name,
    Class: UpdateBookComponentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'bookComponentsValidator',
          internal: BookComponentsValidator.name,
        },
        {
          name: 'bookComponentsRepository',
          internal: BookComponentsRepository.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteBookByIdUseCase.name,
    Class: DeleteBookByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'booksValidator',
          internal: BooksValidator.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteBookComponentByIdUseCase.name,
    Class: DeleteBookComponentByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'bookComponentsValidator',
          internal: BookComponentsValidator.name,
        },
        {
          name: 'bookComponentsRepository',
          internal: BookComponentsRepository.name,
        },
        {
          name: 'booksRepository',
          internal: BooksRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationsValidator',
          internal: AuthenticationsValidator.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authenticationsRepository',
          internal: AuthenticationsRepository.name,
        },
      ],
    },
  },
  {
    key: UserLogoutUseCase.name,
    Class: UserLogoutUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationsValidator',
          internal: AuthenticationsValidator.name,
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
