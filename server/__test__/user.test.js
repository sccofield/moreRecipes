import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import bcrypt from 'bcrypt';


import app from '../app';
import db from '../models';

const saltRounds = Number(process.env.SALTROUNDS);

chai.use(chaiHttp);


describe('Testing User Controller', () => {
  before(async () => {
    await db.sequelize.sync();
    await db.Recipe.destroy({ where: {} });
    await db.User.destroy({ where: {} });
  });
  describe('Testing signup controller', () => {
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

  describe('Testing sigin controller', () => {
    before(() => db.User.create({
      userName: 'mike@gmail.com',
      email: 'mike@gmail.com',
      password: bcrypt.hashSync('michael', saltRounds)
    }));
    it('should return 200 when all parameters are given', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'mike@gmail.com',
          password: 'michael'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 400 when one of the parameter is not given', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'mike@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 when the password is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'mike@gmail.com',
          password: 'mike'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
