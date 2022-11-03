const UsersSchema = (joi) => ({
  postUserPayloadSchema: joi.object({
    email: joi.string().email().required(),
    username: joi.string().max(50).regex(/^[\w]+$/).required(),
    password: joi.string().required(),
    fullname: joi.string().required(),
  }),

  getUserByIdParamsSchema: joi.object({
    userId: joi.string().uuid().required(),
  }),
});

module.exports = UsersSchema;
