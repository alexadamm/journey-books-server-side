const AddBookUseCase = require('../../../../Applications/use_cases/AddBookUseCase');
const DeleteBookByIdUseCase = require('../../../../Applications/use_cases/DeleteBookByIdUseCase');
const GetBookByIdUseCase = require('../../../../Applications/use_cases/GetBookByIdUseCase');
const GetBooksUseCase = require('../../../../Applications/use_cases/GetBooksUseCase');
const UpdateBookByIdUseCase = require('../../../../Applications/use_cases/UpdateBookByIdUseCase');

class BooksController {
  constructor(container) {
    this.container = container;

    this.postBookController = this.postBookController.bind(this);
    this.getBooksController = this.getBooksController.bind(this);
    this.getBookByIdController = this.getBookByIdController.bind(this);
    this.putBookByIdController = this.putBookByIdController.bind(this);
    this.deleteBookByIdController = this.deleteBookByIdController.bind(this);
  }

  async postBookController(req, res) {
    const {
      auth: { userId },
    } = req;
    const addBookUseCase = this.container.getInstance(AddBookUseCase.name);
    const addedBook = await addBookUseCase.execute(userId, req.body);

    res.status(201).json({
      isSuccess: true,
      message: 'Book added successfully',
      data: { addedBook },
    });
  }

  async getBooksController(req, res) {
    const {
      auth: { userId },
    } = req;
    const getBooksUseCase = this.container.getInstance(GetBooksUseCase.name);
    const books = await getBooksUseCase.execute(userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Books retrieved successfully',
      data: { books },
    });
  }

  async getBookByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const getBookByIdUseCase = this.container.getInstance(GetBookByIdUseCase.name);
    const book = await getBookByIdUseCase.execute(req.params, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Book retrieved successfully',
      data: { book },
    });
  }

  async putBookByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const updateBookByIdUseCase = this.container.getInstance(UpdateBookByIdUseCase.name);
    const updatedBook = await updateBookByIdUseCase.execute(req.params, req.body, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Book updated successfully',
      data: { updatedBook },
    });
  }

  async deleteBookByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const deleteBookByIdUseCase = this.container.getInstance(DeleteBookByIdUseCase.name);
    await deleteBookByIdUseCase.execute(req.params, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Book deleted successfully',
    });
  }
}

module.exports = BooksController;
