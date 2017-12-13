import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import app from '../app';
import db from '../models';

const saltRounds = Number(process.env.SALTROUNDS);

chai.use(chaiHttp);

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: 7200 });
};

describe('Testing Recipe Controller', () => {
  describe('API endpoint to get all recipes', () => {
    it('should return 200 with /api/v1/recipes at all times', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 200 if it has a sort query', () => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });
});
