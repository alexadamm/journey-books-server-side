const AuthenticationError = require('../AuthenticationError');
const ClientError = require('../ClientError');

describe('AuthenticationError', () => {
  it('should create an error correctly', () => {
    const authenticationError = new AuthenticationError({ message: 'an error occurs' });

    expect(authenticationError).toBeInstanceOf(AuthenticationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.name).toEqual('AuthenticationError');
    expect(authenticationError.status).toEqual('UNAUTHORIZED');
    expect(authenticationError.errors.message).toEqual('an error occurs');
  });
});
