import Recipe from './controllers/recipes';
import User from './controllers/users';
import Middleware from './middleware';

// const user = new userController();

// const recipe = new Recipe();

// const middleware = new Middleware();

const routes = (app) => {
  // post recipe route
  app.post('/api/v1/recipes', Middleware.verifyToken, Recipe.postRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', Middleware.verifyToken, Recipe.editRecipe);

  // delete recipe
  app.delete('/api/v1/recipes/:id', Middleware.verifyToken, Recipe.deleteRecipe);

  // Get all recipes
  app.get('/api/v1/recipes', Recipe.getAllRecipes);

  // Add review
  app.post('/api/v1/recipes/:id/reviews', Middleware.verifyToken, Recipe.addReview);

  app.post('/api/v1/users/signup', User.signup);

  // signin route
  app.post('/api/v1/users/signin', User.signin);
};

export default routes;
