/* istanbul ignore file */
const { PrismaClient } = require('@prisma/client');

const pool = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
    },
  },
});

module.exports = pool;
