describe('Routes movies', () => {
  const {
    Movies,
    Directors,
    MovieCopies,
    MovieRents,
  } = app.datasource.models;

  const defaultMovie = {
    id: 1,
    title: 'Default movie',
    director_id: 1,
  };
  const defaultDirector = {
    id: 1,
    name: 'Default Director',
  };

  beforeEach((done) => {
    MovieRents
      .destroy({ where: {} })
      .then(() => {
        MovieCopies.destroy({ where: {} })
          .then(() => {
            Movies.destroy({ where: {} })
              .then(() => {
                Directors
                  .destroy({ where: { id: 1 } })
                  .then(() => Directors.create(defaultDirector))
                  .then(() => Movies.create(defaultMovie))
                  .then(() => {
                    done();
                  });
              });
          });
      });
  });

  describe('Route GET /movies', () => {
    it('should return a list of movies', (done) => {
      request
        .get('/movies')
        .end((err, res) => {
          expect(res.body[0].title).to.be.eql(defaultMovie.title);
          expect(res.body[0].director_id).to.be.eql(defaultMovie.director_id);
          expect(res.body[0].id).to.be.eql(defaultMovie.id);
          done(err);
        });
    });
  });

  describe('Route GET /movies/S', () => {
    it('should return a single movie', (done) => {
      request
        .get('/movies/Default%20movie')
        .end((err, res) => {
          expect(res.body.name).to.be.eql(defaultMovie.name);
          expect(res.body.description).to.be.eql(defaultMovie.description);
          expect(res.body.id).to.be.eql(defaultMovie.id);
          done(err);
        });
    });
  });

  describe('Route POST /movies', () => {
    it('should create a movie', (done) => {
      const newMovie = {
        id: 2,
        title: 'newMovie',
        director_id: 1,
      };
      request
        .post('/movies')
        .send(newMovie)
        .end((err, res) => {
          expect(res.body.title).to.be.eql(newMovie.title);
          expect(res.body.director_id).to.be.eql(newMovie.director_id);
          expect(res.body.id).to.be.eql(newMovie.id);
          done(err);
        });
    });
  });
});
