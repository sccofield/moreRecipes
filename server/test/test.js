import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_test`;

const { expect } = chai;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: 7200 });
};

chai.use(chaiHttp);

describe('Testing API endpoints', () => {
  describe('API endpoint to get all recipes', () => {
    it('shoud return 200 with /api/v1/recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud return 200 with /api/v1/recipes?sort=upvotes&order=des', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return an object with property status equal to success', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          done();
        });
    });
    it('should return a recipes property', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.body).to.have.property('recipes');
          done();
        });
    });
    it('should return a 200 status for sorted api', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=up&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API endpoint to add new recipes', () => {
    it('shoud return 201 all the parameters are given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(1))
        .send({
          title: 'Eba stew',
          ingredients: 'eba',
          description: 'lorem ispum',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return 500 when the description is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(1))
        .send({
          title: 'Eba stew',
          ingredients: 'eba',
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
    it('should return 500 when the ingredient is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(1))
        .send({
          title: 'Eba stew',
          description: 'eba',
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
    it('should return 500 when the title is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(1))
        .send({
          ingredients: 'eba',
          description: 'lorem ispum',
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
  describe('API endpoint to modify a recipe', () => {
    it('shoud return 201 when the id is correct and title and ingredient is given', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('token', generateToken(1))
        .send({
          title: 'mike',
          ingredients: 'mhfmf'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud return 201 when the id is correct and title and description is given', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('token', generateToken(1))
        .send({
          title: 'mike',
          description: 'mhfmf'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud return 201 when the id is correct and description and ingredient is given', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('token', generateToken(1))
        .send({
          description: 'mike',
          ingredients: 'mhfmf'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud have a property of status equals to success', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('token', generateToken(1))
        .send({
          title: 'mike',
          ingredients: 'mhfmf'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('status').equals('success');
          done();
        });
    });
  });
});

