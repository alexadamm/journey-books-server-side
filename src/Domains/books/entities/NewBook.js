class NewBook {
  constructor(payload) {
    const { ownerId, title } = payload;
    this.ownerId = ownerId;
    this.title = title;
  }
}

module.exports = NewBook;
