import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class moviesController {
  constructor(Movies) {
    this.Movies = Movies;
  }

  getAll() {
    return this.Movies.findAll({})
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  getByTitle(params) {
    return this.Movies.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  create(data) {
    return this.Movies.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Movies.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  destroy(params) {
    return this.Movies.destroy({ where: params })
      .then(() => defaultResponse({}, HttpStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default moviesController;
