import jwt from 'jwt-simple';

describe('Route Users', () => {
  const { Users, MovieRents } = app.datasource.models;
  const { jwtSecret } = app.config;

  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'test@mail.com',
    password: 'test',
  };

  let token;

  beforeEach((done) => {
    MovieRents.destroy({ where: {} })
      .then(() => {
        Users
          .destroy({ where: {} })
          .then(() => {
            Users.create(defaultUser)
              .then((user) => {
                token = jwt.encode({ id: user.id }, jwtSecret);
                done();
              });
          });
      });
  });

  describe('Route POST /users', () => {
    it('should create a users', (done) => {
      const newUser = {
        id: 2,
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

  describe('Route POST /users/parse', () => {
    it('should return user id', (done) => {
      request
        .post('/users/parse')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          done(err);
        });
    });
  });
});
