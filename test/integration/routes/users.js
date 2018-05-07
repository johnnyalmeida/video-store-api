describe('Route Users', () => {
  const { Users, MovieRents } = app.datasource.models;
  beforeEach((done) => {
    MovieRents.destroy({ where: {} })
      .then(() => {
        Users
          .destroy({ where: {} })
          .then(() => {
            done();
          });
      });
  });

  describe('Route POST /users', () => {
    it('should create a users', (done) => {
      const newUser = {
        id: 1,
        name: 'new User',
        email: 'new@mail.com',
        password: 'testing',
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          expect(res.body.id).to.be.eql(newUser.id);
          done(err);
        });
    });
  });
});
