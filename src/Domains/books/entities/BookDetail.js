class BookDetail {
  constructor(payload) {
    const {
      id, owner, title, createdAt,
    } = payload;
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.createdAt = createdAt;
  }
}

module.exports = BookDetail;
