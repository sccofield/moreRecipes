import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import app from '../app';
import db from '../models';


chai.use(chaiHttp);

const mockData = {};

const saltRounds = 10;

const generateToken = userId => jwt.sign({
  id: userId
}, process.env.SECRET, {
  expiresIn: 7200
});


describe('Testing Recipe Controller', () => {
  before(async () => {
    await db.sequelize.sync();
    await db.Upvote.destroy({ where: {} });
    await db.Downvote.destroy({ where: {} });
    await db.Favorite.destroy({ where: {} });
    await db.Recipe.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    mockData.user1 = await db.User.create({
      userName: 'mike@gmail.com',
      email: 'mike@gmail.com',
      password: bcrypt.hashSync('michael', saltRounds)
    });
    mockData.user2 = await db.User.create({
      userName: 'mike2@gmail.com',
      email: 'mike2@gmail.com',
      password: bcrypt.hashSync('michael', saltRounds)
    });
    mockData.recipe1 = await db.Recipe.create({
      title: 'Apple stew',
      description: 'Apple stew with red tomatoes',
      ingredients: 'apple, tomatoes, oil',
      userId: mockData.user1.id
    });
  });
  describe('API endpoints for home route', () => {
    it('should return 200 with the home route', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API endpoint to GET all recipes /api/v1/recipes', () => {
    it('should return 200 with /api/v1/recipes at all times', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a list of recipe when called', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          const data = res.body.recipes;
          expect(data[0].title).to.equal(mockData.recipe1.title);
          expect(data[0].description).to.equal(mockData.recipe1.description);
          done();
        });
    });
    it('should return 200 if it has a sort query', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API endpoint to GET single recipe /api/v1/recipes/:id', () => {
    it('should return 200 with /api/v1/recipes at all times', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${mockData.recipe1.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return a recipe when called', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${mockData.recipe1.id}`)
        .end((err, res) => {
          const data = res.body.recipe;
          expect(data.title).to.equal(mockData.recipe1.title);
          expect(data.description).to.equal(mockData.recipe1.description);
          done();
        });
    });
    it('should return 400 if the recipe dose not exist', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/100')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('API endpoint to POST recipe /api/v1/recipes', () => {
    it('should return the new recipe when successful', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'New recipe',
          description: 'New recipe desciption',
          ingredients: 'new recipe',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          const data = res.body.recipe;
          expect(data.title).to.equal('New recipe');
          expect(data.description).to.equal('New recipe desciption');
          expect(data.ingredients).to.equal('new recipe');
          done();
        });
    });
    it('should return a status code of 201 when successful', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'New recipe',
          description: 'New recipe desciption',
          ingredients: 'new recipe',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return a status code of 400 title is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
        .send({
          description: 'New recipe desciption',
          ingredients: 'new recipe',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return a status code of 400 description is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'New recipe',
          ingredients: 'new recipe',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return a status code of 400 title is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'New recipe',
          description: 'New recipe desciption',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return a status code of 401 when there is no valid access token', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          title: 'New recipe',
          description: 'New recipe desciption',
          ingredients: 'new recipe',
          userId: mockData.user1.id
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
  describe('API endpoint to update recipes PUT /api/v1/recipes/:id', () => {
    it('should return status of 201 when recipes update successfully', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${mockData.recipe1.id}`)
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'updated title'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should update the recipe and return the updated receipe', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${mockData.recipe1.id}`)
        .set('token', generateToken(mockData.user1.id))
        .send({
          title: 'updated title'
        })
        .end((err, res) => {
          const data = res.body.recipe;
          expect(data.title).to.equal('updated title');
          done();
        });
    });
    it('should return status of 401 when there is no valid token', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${mockData.recipe1.id}`)
        .send({
          title: 'updated title'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should return status of 401 when the recipe is not for user', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${mockData.recipe1.id}`)
        .set('token', generateToken(mockData.user2.id))
        .send({
          title: 'updated title'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
  describe('API endpoint to delete recipes DELETE /api/v1/recipes/:id', () => {
    beforeEach(async () => {
      mockData.recipe2 = await db.Recipe.create({
        title: 'indomie',
        description: 'cook indomie',
        ingredients: 'indomie, egg',
        userId: mockData.user1.id
      });
    });
    it('should return status of 200 when recipes delete successfully', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${mockData.recipe2.id}`)
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return status of 400 if the recipe dose not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/100')
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe('API endpoint to add review POST /api/v1/recipes/:id/reviews', () => {
    it('should return status of 201 when review adds successfully', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${mockData.recipe1.id}/reviews`)
        .set('token', generateToken(mockData.user1.id))
        .send({
          review: 'nice recipe'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
    it('should return status of 400 if the recipe dose not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/reviews')
        .set('token', generateToken(mockData.user1.id))
        .send({
          review: 'nice recipe'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should return status of 400 if no review is added', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/reviews')
        .set('token', generateToken(mockData.user1.id))
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
