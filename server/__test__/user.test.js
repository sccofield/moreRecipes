import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
import db from '../models';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  before(() => db.sequelize.sync());
  before(() => db.User.destroy({ where: {} }));
  describe('API endpoint to register user', () => {
    it('should register a new user when all the parameters are given', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          userName: 'michael',
          email: 'michael@yahoo.com',
          password: 'password',
          cPassword: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
  it('should return a 400 when an invalid email is used', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'pato',
        email: 'maara',
        password: 'password',
        cPassword: 'password'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return a 400 status code when a paramet is missing', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'mata',
        password: 'password'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
