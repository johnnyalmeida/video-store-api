import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class moviesController {
  constructor(models) {
    this.Movies = models.Movies;
    this.MovieCopies = models.MovieCopies;
  }

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

  getByTitle(params) {
    return this.Movies.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }
}

export default moviesController;
