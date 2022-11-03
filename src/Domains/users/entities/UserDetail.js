class UserDetail {
  constructor(payload) {
    const {
      id, email, username, fullname,
    } = payload;
    this.id = id;
    this.email = email;
    this.username = username;
    this.fullname = fullname;
  }
}

module.exports = UserDetail;
