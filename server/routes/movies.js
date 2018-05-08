import MoviesController from '../controllers/movies';

export default (app) => {
  const moviesController = new MoviesController(app.datasource.models);

  app.route('/movies')
    .get((req, res) => {
      moviesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/movies/:title')
    .get((req, res) => {
      moviesController.getByTitle(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
