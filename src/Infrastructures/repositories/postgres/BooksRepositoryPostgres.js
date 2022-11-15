const BooksRepository = require('../../../Domains/books/BooksRepository');
const BookDetail = require('../../../Domains/books/entities/BookDetail');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

class BooksRepositoryPostgres extends BooksRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addBook(newBook) {
    const book = await this.pool.Book.create({
      data: newBook,
      include: {
        owner: {
          select: { username: true },
        },
      },
    });

    return new BookDetail({ ...book, owner: book.owner.username });
  }

  async getBooksByUserId(userId) {
    const books = await this.pool.Book.findMany({
      where: { ownerId: userId },
      include: {
        owner: {
          select: { username: true },
        },
      },
    });
    return books.map((book) => new BookDetail({ ...book, owner: book.owner.username }));
  }

  async verifyBookAccessbility(bookId, userId) {
    const book = await this.pool.Book.findUnique({
      where: { id: bookId },
      select: { ownerId: true },
    });

    if (book.ownerId !== userId) {
      throw new AuthorizationError({ message: 'You have no permission to access this source' });
    }
  }

  async getBookById(bookId) {
    const book = await this.pool.Book.findUnique({
      where: { id: bookId },
      include: {
        owner: {
          select: { username: true },
        },
        bookComponents: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return new BookDetail({
      ...book,
      owner: book.owner.username,
      components: book.bookComponents,
    });
  }

  async updateBookById(bookId, newBookTitle) {
    const book = await this.pool.Book.update({
      where: { id: bookId },
      data: { title: newBookTitle },
      include: {
        owner: {
          select: { username: true },
        },
      },
    });

    return new BookDetail({ ...book, owner: book.owner.username });
  }

  async deleteBookById(bookId) {
    await this.pool.Book.delete({
      where: { id: bookId },
    });
  }
}

module.exports = BooksRepositoryPostgres;
