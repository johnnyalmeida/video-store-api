import jwt from 'jwt-simple';

describe('Routes movies/rent', () => {
  const {
    MovieRents,
    MovieCopies,
    Movies,
    Directors,
    Users,
  } = app.datasource.models;

  const { jwtSecret } = app.config;

  const defaultMovie = {
    id: 1,
    title: 'Default movie',
    director_id: 1,
  };
  const defaultDirector = {
    id: 1,
    name: 'Default Director',
  };
  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'test@mail.com',
    password: 'test',
  };
  const defaultCopy = {
    id: 1,
    movie_id: 1,
    available: true,
  };
  const defaultRent = {
    id: 1,
    movie_copy_id: 1,
    user_id: 1,
    returned: false,
  };

  let token;

  // Prepare data to test
  beforeEach((done) => {
    MovieRents
      .destroy({ where: {} })
      .then(() => {
        MovieCopies
          .destroy({ where: {} })
          .then(() => {
            Movies
              .destroy({ where: {} })
              .then(() => {
                Directors
                  .destroy({ where: {} })
                  .then(() => {
                    Directors.create(defaultDirector);
                  })
                  .then(() => {
                    Movies.create(defaultMovie);
                  })
                  .then(() => {
                    MovieCopies.create(defaultCopy);
                  })
                  .then(() => {
                    Users
                      .destroy({ where: {} })
                      .then(() => {
                        Users.create(defaultUser)
                          .then((user) => {
                            MovieRents.create(defaultRent)
                              .then(() => {
                                token = jwt.encode({ id: user.id }, jwtSecret);
                                done();
                              });
                          });
                      });
                  });
              });
          });
      });
  });

  describe('Route GET /rents', () => {
    it('should return a list of movie rents', (done) => {
      request
        .get('/rents')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].user_id).to.be.eql(defaultRent.user_id);
          expect(res.body[0].returned).to.be.eql(defaultRent.returned);
          expect(res.body[0].movie_copy_id).to.be.eql(defaultRent.movie_copy_id);
          expect(res.body[0].id).to.be.eql(defaultRent.id);
          done(err);
        });
    });
  });

  describe('Route GET /rents/{id}', () => {
    it('should return a single movie rent', (done) => {
      request
        .get('/rents/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.user_id).to.be.eql(defaultRent.user_id);
          expect(res.body.movie_copy_id).to.be.eql(defaultRent.movie_copy_id);
          expect(res.body.returned).to.be.eql(defaultRent.returned);
          expect(res.body.id).to.be.eql(defaultRent.id);
          done(err);
        });
    });
  });

  describe('Route POST /rents/create', () => {
    it('should create a movie rent', (done) => {
      const newRent = {
        movie_id: 1,
        user_id: 1,
      };
      request
        .post('/rents/create')
        .set('Authorization', `bearer ${token}`)
        .send(newRent)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(201);
          expect(res.body.movie_copy_id).to.be.eql(newRent.movie_id);
          expect(res.body.user_id).to.be.eql(newRent.user_id);
          done(err);
        });
    });
  });

  describe('Route PUT /movies/rent', () => {
    it('should update a movie rent', (done) => {
      const returnRent = {
        movie_copy_id: 2,
      };

      const newCopy = {
        id: 2,
        movie_id: 1,
        available: false,
      };

      const newRent = {
        id: 2,
        movie_copy_id: 2,
        user_id: 1,
        returned: false,
      };

      MovieCopies.create(newCopy)
        .then(() => MovieRents.create(newRent))
        .then(() => {
          request
            .put('/rents/return/2')
            .set('Authorization', `bearer ${token}`)
            .send(returnRent)
            .end((err, res) => {
              expect(res.body.rent_updated).to.be.eql([1]);
              expect(res.body.movie_copy_updated).to.be.eql([1]);
              done(err);
            });
        });
    });
  });
});
