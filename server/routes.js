import Recipe from './controllers/recipes';
import User from './controllers/users';
import Middleware from './middleware';

// const user = new userController();

// const recipe = new Recipe();

// const middleware = new Middleware();

const routes = (app) => {
  app.get('/', Recipe.welcome);
  // post recipe route
  app.post('/api/v1/recipes', Middleware.verify, Recipe.addRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', Middleware.verify, Recipe.modifyRecipe);

  // delete recipe
  app.delete('/api/v1/recipes/:id', Middleware.verify, Recipe.deleteRecipe);

  // Get all recipes
  app.get('/api/v1/recipes', Recipe.getAllRecipes);

  app.get('/api/v1/recipes/:id', Recipe.getRecipe);

  // Add review
  app.post('/api/v1/recipes/:id/reviews', Middleware.verify, Recipe.addReview);

  app.post('/api/v1/users/signup', User.signup);

  // signin route
  app.post('/api/v1/users/signin', User.signin);

  // view all user
  app.get('/api/v1/users', Middleware.verify, User.getAllUser);

  // view user profile
  app.get('/api/v1/users/:id', Middleware.verify, User.getUser);
  
  // add favorite
  app.post('/api/v1/users/:recipeId/favorites', Middleware.verify, User.addFavorite);

  app.post('/api/v1/users/:recipeId/upvote', Middleware.verify, User.upvote);

  app.post('/api/v1/users/:recipeId/downvote', Middleware.verify, User.downvote);

  // get favorite
  app.get('/api/v1/users/favorites', Middleware.verify, User.getFavorite);
};

export default routes;
