const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookDetail = require('../../../Domains/books/entities/BookDetail');

class BooksRepositoryPostgres extends BooksRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addBook(newBook) {
    const book = await this.pool.Book
      .create({
        data: newBook,
        include: {
          owner: {
            select: { username: true },
          },
        },
      });

    return new BookDetail({ ...book, owner: book.owner.username });
  }
}

module.exports = BooksRepositoryPostgres;
