# Journey Books Server-Side

Node.js back-end with clean architecture

## Project Structure

```
journey-books-server-side/  → Project's root.
├─ .github/workflows        → Workflows directory, used for implementation of Continuous Integration and Continuous Deployment.
├─ prisma/                  → Database schema and migrations directory.
├─ src/                     → Source code of the application.
│  ├─ Applications/         → Application Business Rules
│  │  ├─ security/          → Abstract/interface from security tools and helper that used on use case. e.g. AuthTokenManager and EncryptionHelper
│  │  ├─ use_cases/         → App business flow.
│  │  ├─ validators/        → Abstract/interface from request validators that used on use case.
│  ├─ Commons/              → Shared folder.
│  │  ├─ exceptions/        → Custom exceptions.
│  │  ├─ utils/             → Helper functions.
│  ├─ Domains/              → Enterprise Business Rules.
│  │  ├─ authentications/   → Authentications Subdomain, contains domain model (entities) and abstract/interface of AuthenticationsRepository.
│  │  ├─ users/             → Users Subdomain, contains domain model (entities) and abstract/interface of UsersRepository.
│  ├─ Infrastructures/      → External agent, such as Framework and External Tools.
│  │  ├─ database/          → Database driver.
│  │  ├─ http/              → HTTP Server that use Express.js.
│  │  ├─ repositories/      → Object concrete/implementation of domains repository.
│  │  ├─ securities/        → Object concrete/implementation of security helper.
│  │  ├─ validators/        → Object concrete/implementation of request validator.
│  │  ├─ container.js       → Container of all of instances of application services.
│  ├─ Interfaces/           → Interface Adapter, where the routes configuration and controller define using Express Plugin.
│  ├─ app.js                → Entry point of the application.
├─ tests/                   → Utility needs for testing.
├─ .env                     → Environment variable.
├─ package.json             → Project Manifest.

```

## Getting Started

### Step 1: Set up the development environment

You need to set up your development environment before you can do anything.

Install [Node.js and npm](https://nodejs.org/en/download/).

Install [PostgreSQL](https://www.postgresql.org/download/).

Set up the [development environment](https://github.com/alexadamm/journey-books-server-side#development-environment).

### Step 2: Install dependencies

- Install all dependencies with `npm install`.

### Step 3: Run database migrations

- Create database tables by migration with `npm run db:migrate:dev`.

### Step 4: Run in dev mode

- Run `npm run start:dev`.
- The server address will be displayed to you as `http://0.0.0.0:{PORT}`.

### Development environment

To run the development migrations and server, you should define the development environment with `.env` file on the root directory.

`.env` file contains:

```
# HTTP SERVER
PORT                → Port of http server.

# POSTGRES
DATABASE_URL        → URL of postgresql database.
DATABASE_URL_TEST   → URL of postgresql test database.

# HASHER
SALT                → Salt round for the encrypter.

# TOKENIZE
ACCESS_TOKEN_KEY    → Secret token key for access token on authentication.
REFRESH_TOKEN_KEY   → Secret token key for refresh token on authentication.
ACCCESS_TOKEN_AGE   → Access token age on authentication. e.g. '3h' for 3 hours
```
