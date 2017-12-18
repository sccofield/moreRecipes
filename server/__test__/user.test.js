import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import app from '../app';
import db from '../models';

const saltRounds = Number(process.env.SALTROUNDS);
const mockData = {};
const generateToken = userId => jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: 7200 });

chai.use(chaiHttp);


describe('Testing User Controller', () => {
  before(async () => {
    await db.sequelize.sync();
    await db.Upvote.destroy({ where: {} });
    await db.Downvote.destroy({ where: {} });
    await db.Review.destroy({ where: {} });
    await db.Favorite.destroy({ where: {} });
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
    it('should return status 400 when email is missing', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'pato',
          password: 'password',
          cPassword: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return status 400 when password is missing', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'pato',
          email: 'maara',
          cPassword: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return status 400 when passwords don\'t match', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'pato',
          email: 'maara',
          password: 'passwofrd',
          cPassword: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return status 400 when password is less than 6 characters', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'pato',
          email: 'maara',
          password: 'pass',
          cPassword: 'pass'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('Testing sigin controller', () => {
    before(() => {
      db.User.create({
        userName: 'mike@gmail.com',
        email: 'mike@gmail.com',
        password: bcrypt.hashSync('michael', saltRounds)
      });
    });
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
    it('should return 400 when password is not given', (done) => {
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
    it('should return 400 when email is not given', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          password: 'mike'
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
  describe('API endpoint to add favorite', () => {
    before(async () => {
      mockData.user1 = await db.User.create({
        userName: 'mike5@gmail.com',
        email: 'mike5@gmail.com',
        password: bcrypt.hashSync('michael', saltRounds)
      });
      mockData.recipe1 = await db.Recipe.create({
        title: 'Apple stew',
        description: 'Apple stew with red tomatoes',
        ingredients: 'apple, tomatoes, oil',
        userId: mockData.user1.id
      });
    });
    it('should return status of 201 when successful', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/favorites`)
        .send({})
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return status of 404 when recipe dose not exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/200/favorites')
        .send({})
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('should return status of 400 for already added recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/favorites`)
        .send({})
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('API endpoint to GET all favorite for user', () => {
    before(async () => {
      mockData.user2 = await db.User.create({
        userName: 'mike52@gmail.com',
        email: 'mike52@gmail.com',
        password: bcrypt.hashSync('michael', saltRounds)
      });
    });
    it('should return 200 for a valid user', (done) => {
      chai.request(app)
        .get('/api/v1/users/favorites')
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 404 when user has no favorite', (done) => {
      chai.request(app)
        .get('/api/v1/users/favorites')
        .set('token', generateToken(mockData.user2.id))
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('API endpoint to add upvote', () => {
    before(async () => {
      mockData.user4 = await db.User.create({
        userName: 'mike53@gmail.com',
        email: 'mike53@gmail.com',
        password: bcrypt.hashSync('michael', saltRounds)
      });
    });
    it('should return 201 for a valid user', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/upvote`)
        .set('token', generateToken(mockData.user4.id))
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return 400 when recipe dose not exist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/upvote`)
        .set('token', generateToken(mockData.user4.id))
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('API endpoint to add downvote', () => {
    before(async () => {
      mockData.user5 = await db.User.create({
        userName: 'mike54@gmail.com',
        email: 'mike54@gmail.com',
        password: bcrypt.hashSync('michael', saltRounds)
      });
    });
    it('should return 201 for a valid user', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/downvote`)
        .set('token', generateToken(mockData.user5.id))
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return 400 when recipe dose not exist', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/downvote`)
        .set('token', generateToken(mockData.user5.id))
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
