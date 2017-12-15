import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import app from '../app';
import db from '../models';


chai.use(chaiHttp);

const mockData = {};
const SECRET = 'i love andela';

const saltRounds = 10;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: 7200 });
};

describe('Testing Recipe Controller', () => {
  before(async () => {
    await db.sequelize.sync();
    await db.Recipe.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    mockData.user1 = await db.User.create({
      userName: 'mike@gmail.com',
      email: 'mike@gmail.com',
      password: bcrypt.hashSync('michael', saltRounds)
    });
    mockData.recipe1 = await db.Recipe.create({
      title: 'Apple stew',
      description: 'Apple stew with red tomatoes',
      ingredients: 'apple, tomatoes, oil',
      userId: mockData.user1.id
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
  describe('API endpoint to POST recipe /api/v1/recipes', () => {
    it('should return the new recipe', (done) => {
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
          console.log(err);
          expect(data.title).to.equal('New recipe');
          expect(data.description).to.equal('New recipe desciption');
          expect(data.ingredients).to.equal('new recipe');
          done();
        });
    });
    it('should return a status code of 201', (done) => {
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
    it('should return a status code of 400 when one of the parameters is not given', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', generateToken(mockData.user1.id))
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
    // it('should update the recipe and return the updated receipe', (done) => {
    //   chai.request(app)
    //     .put(`/api/v1/recipes/${mockData.recipe1.id}`)
    //     .set('token', generateToken(mockData.user1.id))
    //     .send({
    //       title: 'updated title'
    //     })
    //     .end((err, res) => {
    //       console.log(err)
    //       const data = res.body.recipes;
    //       expect(data.title).to.equal('updated title');
    //       done();
    //     });
    // });
  });
});
