import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import app from '../app';
import db from '../models';

const saltRounds = Number(process.env.SALTROUNDS);
const mockData = {};
const generateToken = userId => jwt.sign(
  { id: userId },
  process.env.SECRET,
  { expiresIn: 7200 }
);

chai.use(chaiHttp);

const user1 = {
  userName: 'michael123',
  email: 'michael123@test.com',
  password: 'password',
  cPassword: 'password'
};

const user2 = {
  userName: 'michael123',
  email: 'michael123',
  password: 'password',
  cPassword: 'password'
};


describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    const signupUrl = '/api/v1/users/signup';
    it(
      'should register a new user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(user1)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('user has been created');
            expect(response.body.user.username).to.equal(user1.userName);
            expect(response.body.user.email).to.equal(user1.email);
            expect(response.body).to.have.property('token');
            expect(response.body.token).to.be.a('string');
            done();
          });
      }
    );
    it('should not register a user when an invalid email is used', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(user2)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('The email is not valid. Please input a valid email.');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not register a user when email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          userName: 'pato',
          password: 'password',
          cPassword: 'password'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Email is required');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not register a user when password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          userName: 'pato',
          email: 'maara',
          cPassword: 'password'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Password is required');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not register a user when username is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'maara',
          password: 'password',
          cPassword: 'password'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Username is required');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not register a user when passwords don\'t match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          userName: 'pato',
          email: 'maara',
          password: 'passwofrd',
          cPassword: 'password'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Passwords do not match');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it(
      'should not register when password is less than 6 characters',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            userName: 'pato',
            email: 'maara',
            password: 'pass',
            cPassword: 'pass'
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('Password must be more than 6 characters');
            expect(response.body.status).to.equal('Error');
            done();
          });
      }
    );
  });
  describe('Testing sigin controller', () => {
    const signinUrl = '/api/v1/users/signin';
    it('should signin a user all parameters are given', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: user1.email,
          password: user1.password
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Successfully signin');
          expect(response.body.user.username).to.equal(user1.userName);
          expect(response.body.user.email).to.equal(user1.email);
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          done();
        });
    });
    it('should not signin a user when password is not given', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'mike@gmail.com'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('password is required');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not signin a user when email is not given', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          password: 'mike'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Email is required');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not signin a user the password is wrong', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: user1.email,
          password: 'mikegng'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Invalid login details. Email or password wrong');
          expect(response.body.status).to.equal('Error');
          done();
        });
    });
    it('should not signin a user the email is wrong', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'mike@yahoo.com',
          password: 'mikegng'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Invalid login details. Email or password wrong');
          expect(response.body.status).to.equal('Error');
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
    it('should favorite a recipe when the right id is used', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/favorites`)
        .send({})
        .set('token', generateToken(mockData.user1.id))
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe added to favorite');
          expect(response.body.status).to.equal('success');
          done();
        });
    });
    it(
      'should remove the recipe from favorite when the endpoint is hit again',
      (done) => {
        chai.request(app)
          .post(`/api/v1/users/${mockData.recipe1.id}/favorites`)
          .send({})
          .set('token', generateToken(mockData.user1.id))
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('You have removed recipe from favorite');
            expect(response.body.status).to.equal('success');
            done();
          });
      }
    );

    it('should return status of 404 when recipe dose not exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/2000/favorites')
        .send({})
        .set('token', generateToken(mockData.user1.id))
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe dose not exist');
          expect(response.body.status).to.equal('Error');
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
    it('should  return all favorites for a valid user', (done) => {
      chai.request(app)
        .get('/api/v1/users/favorites')
        .set('token', generateToken(mockData.user1.id))
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('favorites');
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
    it('should upvote a recipe for a valid user', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/upvote`)
        .set('token', generateToken(mockData.user4.id))
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe upvoted');
          done();
        });
    });
    it(
      'should remove upvote when the recipe has been upvoted already',
      (done) => {
        chai.request(app)
          .post(`/api/v1/users/${mockData.recipe1.id}/upvote`)
          .set('token', generateToken(mockData.user4.id))
          .send({})
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('You have removed upvote');
            done();
          });
      }
    );
    it('should return 400 when recipe dose not exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/3000/upvote')
        .set('token', generateToken(mockData.user4.id))
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe dose not exist');
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
    it('should downvote a recipe when its a valid user', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/downvote`)
        .set('token', generateToken(mockData.user5.id))
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe downvoted');
          done();
        });
    });
    it('should remove downvote if recipe has been downvoted before', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${mockData.recipe1.id}/downvote`)
        .set('token', generateToken(mockData.user5.id))
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('You have removed down vote');
          done();
        });
    });
    it('should not downvote when recipe dose not exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/1000/downvote')
        .set('token', generateToken(mockData.user5.id))
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe dose not exist');
          done();
        });
    });
  });
});
