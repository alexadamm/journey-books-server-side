const AddBookUseCase = require('../../../../Applications/use_cases/AddBookUseCase');

class BooksController {
  constructor(container) {
    this.container = container;

    this.postBookController = this.postBookController.bind(this);
  }

  async postBookController(req, res) {
    const { auth: { userId } } = req;
    const addBookUseCase = this.container.getInstance(AddBookUseCase.name);
    const addedBook = await addBookUseCase.execute(userId, req.body);

    res.status(201).json({
      isSuccess: true,
      message: 'Book added successfully',
      data: { addedBook },
    });
  }
}

module.exports = BooksController;
