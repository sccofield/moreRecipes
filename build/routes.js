'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recipes = require('./controllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const user = new userController();

// const recipe = new Recipe();

// const middleware = new Middleware();

var routes = function routes(app) {
  app.get('/', _recipes2.default.welcome);
  // post recipe route
  app.post('/api/v1/recipes', _middleware2.default.verify, _recipes2.default.addRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', _middleware2.default.verify, _recipes2.default.modifyRecipe);

  // delete recipe
  app.delete('/api/v1/recipes/:id', _middleware2.default.verify, _recipes2.default.deleteRecipe);

  // Get all recipes
  app.get('/api/v1/recipes', _recipes2.default.getAllRecipes);

  app.get('/api/v1/recipes/:id', _recipes2.default.getRecipe);

  // Add review
  app.post('/api/v1/recipes/:id/reviews', _middleware2.default.verify, _recipes2.default.addReview);

  app.post('/api/v1/users/signup', _users2.default.signup);

  // signin route
  app.post('/api/v1/users/signin', _users2.default.signin);

  // add favorite
  app.post('/api/v1/users/:recipeId/favorites', _middleware2.default.verify, _users2.default.addFavorite);

  // add upvote
  app.post('/api/v1/users/:recipeId/upvote', _middleware2.default.verify, _users2.default.upvote);

  // add downvote
  app.post('/api/v1/users/:recipeId/downvote', _middleware2.default.verify, _users2.default.downvote);

  // get favorite
  app.get('/api/v1/users/favorites', _middleware2.default.verify, _users2.default.getFavorite);
};

exports.default = routes;