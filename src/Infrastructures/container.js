const { createContainer } = require('instances-container');
const argon2 = require('argon2');
const Hasher = require('../Applications/securities/Hasher');
const HasherArgon = require('./securities/HasherArgon');

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
]);

// registering use cases
container.register([
]);

module.exports = container;
