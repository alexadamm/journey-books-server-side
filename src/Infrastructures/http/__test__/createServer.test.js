const request = require('supertest');
const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response 404 when request to unregistered route', async () => {
    // Arrange
    const app = await createServer({});

    // Action
    const response = await request(app).get('/unregisteredRoute');

    // Assert
    expect(response.statusCode).toEqual(404);
    expect(response.body.errors.message).toEqual('Page not found');
  });

  it('should handle server error correctly', async () => {
    // Arrange
    const app = await createServer({});

    // Action
    const response = await request(app).post('/users');

    expect(response.statusCode).toEqual(500);
    expect(response.body.isSuccess).toEqual(false);
    expect(response.body.errors.message).toEqual('an error occured on our server');
  });
});
