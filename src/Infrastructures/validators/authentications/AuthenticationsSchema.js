const AuthenticationsSchema = (joi) => ({
  PostAuthenticationSchema: joi.object({
    username: joi
      .string()
      .max(50)
      .regex(/^[\w]+$/)
      .required(),
    password: joi.string().required(),
  }),

  DeleteAuthenticationSchema: joi.object({
    refreshToken: joi.string().required(),
  }),

  PutAuthenticationSchema: joi.object({
    refreshToken: joi.string().required(),
  }),
});

module.exports = AuthenticationsSchema;
