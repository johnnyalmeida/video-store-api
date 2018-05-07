import MoviesController from '../controllers/movies';

export default (app) => {
  const moviesController = new MoviesController(app.datasource.models.Movies);

  app.route('/movies')
    .get((req, res) => {
      moviesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      moviesController.create(req.body)
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
    })
    .put((req, res) => {
      moviesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      moviesController.destroy(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
