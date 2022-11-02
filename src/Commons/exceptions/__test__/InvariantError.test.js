const ClientError = require('../ClientError');
const InvariantError = require('../InvariantError');

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError({ message: 'an error occurs' });

    expect(invariantError).toBeInstanceOf(InvariantError);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(Error);

    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.name).toEqual('InvariantError');
    expect(invariantError.status).toEqual('BAD_REQUEST');
    expect(invariantError.errors.message).toEqual('an error occurs');
  });
});
