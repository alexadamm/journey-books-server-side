const request = require('supertest');
const createServer = require('../createServer');

describe('HTTP server', () => {
  describe('when GET /', () => {
    it('should return 200', async () => {
      // Arrange
      const app = await createServer({});

      // Action
      const response = await request(app).get('/');

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual('Journey Books API');
    });
  });

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
