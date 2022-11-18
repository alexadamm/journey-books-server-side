class BookComponentDetail {
  constructor(payload) {
    const {
      id, bookId, content, latitude, longitude, updatedAt, createdAt,
    } = payload;
    this.id = id;
    this.bookId = bookId;
    this.content = content;
    this.latitude = latitude;
    this.longitude = longitude;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}

module.exports = BookComponentDetail;
