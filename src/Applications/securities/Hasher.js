class Hasher {
  async hash(plain) {
    throw new Error('HASHER.METHOD_NOT_IMPLEMENTED');
  }

  async compare(plain, encrypted) {
    throw new Error('HASHER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = Hasher;
