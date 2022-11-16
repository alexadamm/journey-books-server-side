const BooksSchema = (joi) => ({
  BookPayloadSchema: joi.object({
    title: joi.string().required(),
  }),

  BookIdSchema: joi.object({
    bookId: joi.string().uuid().required(),
  }),
});

module.exports = BooksSchema;
