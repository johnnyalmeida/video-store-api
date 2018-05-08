import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class movieRentsController {
  constructor(models) {
    this.MovieRents = models.MovieRents;
    this.MovieCopies = models.MovieCopies;
    this.Movies = models.Movies;
    this.copies = [];
  }

  getAll() {
    return this.MovieRents.findAll({})
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  getById(params) {
    return this.MovieRents.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  create(data) {
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

  returnMovie(data) {
    return this.MovieRents.update({ returned: true }, { where: data })
      .then((result) => {
        return this.MovieCopies.update(
          { available: true },
          { where: { id: data.movie_copy_id } },
        )
          .then(resultCopy => defaultResponse({
            rent_updated: result,
            movie_copy_updated: resultCopy,
          }))
          .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
      })
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  destroy(params) {
    return this.MovieRents.destroy({ where: params })
      .then(() => defaultResponse({}, HttpStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default movieRentsController;
