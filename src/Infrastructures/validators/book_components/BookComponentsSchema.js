const BookComponentsSchema = (joi) => ({
  PostBookComponentPayloadSchema: joi.object({
    content: joi.string().required(),
    latitude: joi.string().required(),
    longitude: joi.string().required(),
  }),

  PostBookComponentParamsSchema: joi.object({
    bookId: joi.string().uuid().required(),
  }),

  PutBookComponentPayloadSchema: joi.object({
    content: joi.string(),
    latitude: joi.string(),
    longitude: joi.string(),
  }),

  BookComponentParamsSchema: joi.object({
    bookId: joi.string().uuid().required(),
    componentId: joi.string().uuid().required(),
  }),
});

module.exports = BookComponentsSchema;
