'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.DATABASE_URL = process.env.DATABASE_URL + '_test';

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

describe('Testing API endpoints', function () {
  beforeEach(function () {});
  afterEach(function () {});

  describe('API endpoint to get all recipes', function () {
    it('shoud return 200 with /api/v1/recipes', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('shoud return 200 with /api/v1/recipes?sort=upvotes&order=des', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes?sort=upvotes&order=des').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return an object with property status equal to success', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
    });
    it('should return a recipes property', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        expect(res.body).to.have.property('recipes');
        done();
      });
    });
    it('should return a 200 status for sorted api', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes?sort=up&order=des').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('API endpoint to add new recipes', function () {
    it('shoud return 201 all the parameters are given', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'Eba stew',
        ingredients: 'eba',
        description: 'lorem ispum',
        author: 'mike'
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
    it('should return 400 when the author is not given', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'Eba stew',
        ingredients: 'eba',
        description: 'lorem ispum'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should return 400 when the description is not given', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'Eba stew',
        ingredients: 'eba',
        author: 'Mike'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should return 400 when the ingredient is not given', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'Eba stew',
        description: 'eba',
        author: 'Mike'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should return 400 when the title is not given', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('content-type', 'application/x-www-form-urlencoded').send({
        ingredients: 'eba',
        description: 'lorem ispum',
        author: 'Mike'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('API endpoint to modify a recipe', function () {
    it('shoud return 201 when the id is correct and title and ingredient is given', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'mike',
        ingredients: 'mhfmf'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('shoud return 201 when the id is correct and title and description is given', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'mike',
        description: 'mhfmf'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('shoud return 201 when the id is correct and description and ingredient is given', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('content-type', 'application/x-www-form-urlencoded').send({
        description: 'mike',
        ingredients: 'mhfmf'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('shoud return 404 when the id is not available', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/500').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'mike',
        ingredients: 'mhfmf'
      }).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('shoud have a property of status equals to success', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').set('content-type', 'application/x-www-form-urlencoded').send({
        title: 'mike',
        ingredients: 'mhfmf'
      }).end(function (err, res) {
        expect(res.body).to.have.property('status').equals('success');
        done();
      });
    });
  });
  describe('API endpoint to delete recipe', function () {
    it('shoud return 200 when the id is correct', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('API endpoint to add review', function () {
    it('shoud return 200 when the id is correct', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/reviews').set('content-type', 'application/x-www-form-urlencoded').send({
        user: 'mike',
        review: 'nice meals'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('shoud return 404 when the id is not correct', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/500/reviews').set('content-type', 'application/x-www-form-urlencoded').send({
        user: 'mike',
        review: 'nice meals'
      }).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});