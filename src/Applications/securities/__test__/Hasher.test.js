const Hasher = require('../Hasher');

describe('Hasher interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const hasher = new Hasher();

    // Action and Assert
    expect(hasher.hash('plain')).rejects.toThrowError(
      'HASHER.METHOD_NOT_IMPLEMENTED',
    );
    expect(hasher.compare('plain', 'encrypted')).rejects.toThrowError(
      'HASHER.METHOD_NOT_IMPLEMENTED',
    );
  });
});
