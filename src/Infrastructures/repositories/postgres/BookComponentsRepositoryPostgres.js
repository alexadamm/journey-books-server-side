const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const BookComponentsRepository = require('../../../Domains/book_components/BookComponentsRepository');
const BookComponentDetail = require('../../../Domains/book_components/entities/BookComponentDetail');

class BookComponentsRepositoryPostgres extends BookComponentsRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addBookComponent(newBookComponent) {
    const bookComponent = await this.pool.BookComponent.create({
      data: newBookComponent,
    });

    return new BookComponentDetail(bookComponent);
  }

  async getBookComponentById(componentId) {
    const bookComponent = await this.pool.BookComponent.findUnique({
      where: { id: componentId },
    });

    if (!bookComponent) {
      throw new NotFoundError('Book component not found');
    }

    return new BookComponentDetail(bookComponent);
  }

  async updateBookComponentById(bookComponentId, bookComponent) {
    const updatedBookComponent = await this.pool.BookComponent.update({
      where: { id: bookComponentId },
      data: bookComponent,
    });

    return new BookComponentDetail(updatedBookComponent);
  }

  async deleteBookComponentById(bookComponentId) {
    await this.pool.BookComponent.delete({
      where: { id: bookComponentId },
    });
  }
}

module.exports = BookComponentsRepositoryPostgres;
