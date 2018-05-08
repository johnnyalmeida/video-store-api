import MovieRentsController from '../controllers/movieRents';

export default (app) => {
  const moviesRentsController = new MovieRentsController(app.datasource.models);

  app.route('/rents')
    .all(app.auth.authenticate())
    .get((req, res) => {
      moviesRentsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/rents/create')
    .all(app.auth.authenticate())
    .post((req, res) => {
      moviesRentsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/rents/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      moviesRentsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/rents/return/:id')
    .all(app.auth.authenticate())
    .put((req, res) => {
      moviesRentsController.returnMovie(req.body, req.params, req.headers)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
