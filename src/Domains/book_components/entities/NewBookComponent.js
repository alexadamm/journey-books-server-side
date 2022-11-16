class NewBookComponent {
  constructor(payload) {
    const {
      bookId, content, latitude, longitude,
    } = payload;
    this.bookId = bookId;
    this.content = content;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

module.exports = NewBookComponent;
