const BooksSchema = (joi) => ({
  PostBookSchema: joi.object({
    title: joi.string().required(),
  }),
});

module.exports = BooksSchema;
