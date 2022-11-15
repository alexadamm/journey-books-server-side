class BookDetail {
  constructor(payload) {
    const {
      id, owner, components, title, createdAt,
    } = payload;
    this.id = id;
    this.owner = owner;
    this.components = components;
    this.title = title;
    this.createdAt = createdAt;
  }
}

module.exports = BookDetail;
