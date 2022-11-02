const ClientError = require('../ClientError');
const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should create an error correctly', () => {
    const notFoundError = new NotFoundError({ message: 'an error occurs' });

    expect(notFoundError).toBeInstanceOf(NotFoundError);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(Error);

    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.name).toEqual('NotFoundError');
    expect(notFoundError.status).toEqual('NOT_FOUND');
    expect(notFoundError.errors.message).toEqual('an error occurs');
  });
});
