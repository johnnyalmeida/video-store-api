import HttpStatus from 'http-status';

/**
 * Default success response callback
 * @param {Obj} data - Response data
 * @param {*} statusCode - Status code, default 200
 */
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

/**
 * Default error response callback
 * @param {Obj} data - Response data
 * @param {*} statusCode - Status code, default 200
 */
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

/**
 * Manage movies endpoints
 */
class moviesController {
  constructor(models) {
    this.Movies = models.Movies;
    this.MovieCopies = models.MovieCopies;
  }

  /**
   * Get all available movies.
   */
  getAll() {
    return this.Movies.findAll({
      where: {},
      include: [{
        model: this.MovieCopies,
        where: {
          available: true,
        },
      }],
    })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  /**
   * Get a movie by the title.
   */
  getByTitle(params) {
    return this.Movies.findOne({
      where: params,
      include: [{
        model: this.MovieCopies,
        where: {
          available: true,
        },
      }],
    })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }
}

export default moviesController;
