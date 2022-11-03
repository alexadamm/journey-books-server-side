const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().max(50).regex(/^[\w]+$/).required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const GetUserByIdParamsSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});

module.exports = { PostUserPayloadSchema, GetUserByIdParamsSchema };
