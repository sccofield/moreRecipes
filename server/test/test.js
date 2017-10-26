import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

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
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          title: 'Eba stew',
          ingredients: 'eba',
          description: 'lorem ispum',
          author: 'mike'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return 400 when the author is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          title: 'Eba stew',
          ingredients: 'eba',
          description: 'lorem ispum',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return 400 when the title is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          ingredients: 'eba',
          description: 'lorem ispum',
          author: 'Mike'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('API endpoint to modify a recipe', () => {
    it('shoud return 201 when the id is correct', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          title: 'mike',
          ingredients: 'mhfmf'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud return 404 when the id is not available', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/500')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          title: 'mike',
          ingredients: 'mhfmf'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('shoud have a property of status equals to success', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('content-type', 'application/x-www-form-urlencoded')
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
  describe('API endpoint to delete recipe', () => {
    it('shoud return 200 when the id is correct', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API endpoint to add review', () => {
    it('shoud return 200 when the id is correct', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          user: 'mike',
          review: 'nice meals',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('shoud return 404 when the id is not correct', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/500/reviews')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          user: 'mike',
          review: 'nice meals',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
