/* istanbul ignore file */
const ServerTestHelper = {
  async newUser({ request, app }, {
    email = 'johndoe@gmail.com', username = 'johndoe', fullname = 'John Doe', password = 'secret',
  }) {
    const newUserResponse = await request(app).post('/users').send({
      email, username, fullname, password,
    });
    const { id: userId } = newUserResponse.body.data.addedUser;
    const loginResponse = await request(app).post('/authentications').send({ username, password });
    const { accessToken } = loginResponse.body.data;
    return { userId, accessToken };
  },
};

module.exports = ServerTestHelper;
