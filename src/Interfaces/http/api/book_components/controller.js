const AddBookComponentUseCase = require('../../../../Applications/use_cases/AddBookComponentUseCase');
const DeleteBookComponentByIdUseCase = require('../../../../Applications/use_cases/DeleteBookComponentByIdUseCase');
const GetBookComponentByIdUseCase = require('../../../../Applications/use_cases/GetBookComponentByIdUseCase');
const UpdateBookComponentUseCase = require('../../../../Applications/use_cases/UpdateBookComponentUseCase');

class BookComponentsController {
  constructor(container) {
    this.container = container;

    this.postBookComponentsController = this.postBookComponentsController.bind(this);
    this.getBookComponentByIdController = this.getBookComponentByIdController.bind(this);
    this.putBookComponentByIdController = this.putBookComponentByIdController.bind(this);
    this.deleteBookComponentByIdController = this.deleteBookComponentByIdController.bind(this);
  }

  async postBookComponentsController(req, res) {
    const {
      auth: { userId },
    } = req;
    const addBookComponentUseCase = this.container.getInstance(AddBookComponentUseCase.name);
    const addedComponent = await addBookComponentUseCase.execute(req.params, req.body, userId);

    res.status(201).json({
      isSuccess: true,
      message: 'Component added successfully',
      data: { addedComponent },
    });
  }

  async getBookComponentByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const getBookComponentByIdUseCase = this.container.getInstance(
      GetBookComponentByIdUseCase.name,
    );
    const component = await getBookComponentByIdUseCase.execute(req.params, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Component retrieved successfully',
      data: { component },
    });
  }

  async putBookComponentByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const updateBookComponentUseCase = this.container.getInstance(UpdateBookComponentUseCase.name);
    const updatedComponent = await updateBookComponentUseCase.execute(req.params, req.body, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Component updated successfully',
      data: { updatedComponent },
    });
  }

  async deleteBookComponentByIdController(req, res) {
    const {
      auth: { userId },
    } = req;
    const deleteBookComponentByIdUseCase = this.container.getInstance(
      DeleteBookComponentByIdUseCase.name,
    );
    await deleteBookComponentByIdUseCase.execute(req.params, userId);

    res.status(200).json({
      isSuccess: true,
      message: 'Component deleted successfully',
    });
  }
}

module.exports = BookComponentsController;
