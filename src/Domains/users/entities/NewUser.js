class NewUser {
  constructor(payload) {
    const {
      email, username, password, fullname,
    } = payload;
    this.email = email;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }
}

module.exports = NewUser;
