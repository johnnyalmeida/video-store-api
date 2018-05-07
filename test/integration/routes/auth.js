describe('Route Users', () => {
  const { Users, MovieRents } = app.datasource.models;

  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'test@mail.com',
    password: 'test',
  };

  beforeEach((done) => {
    MovieRents.destroy({ where: {} })
      .then(() => {
        Users
          .destroy({ where: {} })
          .then(() => Users.create(defaultUser))
          .then(() => {
            done();
          });
      });
  });

  describe('Route POST /auth', () => {
    it('should return a token', (done) => {
      const login = {
        email: 'test@mail.com',
        password: 'test',
      };
      request
        .post('/auth')
        .send(login)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200);
          done(err);
        });
    });
  });
});
