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
 * @param {string} message - Error message
 * @param {*} statusCode - Status code, default 400
 */
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

/**
 * Manage movie rents endpoints
 */
class movieRentsController {
  constructor(models) {
    this.MovieRents = models.MovieRents;
    this.MovieCopies = models.MovieCopies;
    this.Movies = models.Movies;
    this.copies = [];
  }

  /**
   * Get rents from a user.
   */
  getByUser(params) {
    return this.MovieRents.findAll({ where: { user_id: params.user_id, returned: false } })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  /**
   * Create a rent.
   * @param {Obj} data - The rent data
   */
  create(data) {
    // Find the movie and then make sure it has an available copy, make it unavailable.
    return this.Movies.findOne({ where: { id: data.movie_id } })
      .then(movie => movie.getMovieCopies({ where: { available: true } })
        .then((copies) => { this.copies = copies; })
        .then(() => this.MovieCopies.update(
          { available: false },
          { where: { id: this.copies[0].id, available: true } },
        ))
        .then(() => {
          const rent = {
            movie_copy_id: this.copies[0].id,
            user_id: data.user_id,
          };
          return this.MovieRents.create(rent)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(err => errorResponse(err.message));
        })
        .catch(err => errorResponse(err.message)))
      .catch(err => errorResponse(err.message));
  }

  /**
   * Update a rent status to returned.
   * @param {Obj} data - The rent data
   */
  returnMovie(data) {
    // Update the movie rent status and then set movie copy available.
    return this.MovieRents.update({ returned: true }, { where: data })
      .then(result => this.MovieCopies.update(
        { available: true },
        { where: { id: data.movie_copy_id } },
      )
        .then(resultCopy => defaultResponse({
          rent_updated: result,
          movie_copy_updated: resultCopy,
        }))
        .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY)))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default movieRentsController;
