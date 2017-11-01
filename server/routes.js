import * as Recipe from './controllers/recipes';
import userController from './controllers/users';
import Middleware from './middleware';

const user = new userController();

const recipe = new Recipe.default();

const middleware = new Middleware();

const routes = (app) => {
  // post recipe route
  app.post('/api/v1/recipes', middleware.verifyToken, recipe.postRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', middleware.verifyToken, recipe.editRecipe);

  // delete recipe
  app.delete('/api/v1/recipes/:id', middleware.verifyToken, recipe.deleteRecipe);

  // Get all recipes
  app.get('/api/v1/recipes', recipe.getAllRecipes);

  // Add review
  app.post('/api/v1/recipes/:id/reviews', middleware.verifyToken, recipe.addReview);

  app.post('/api/v1/users/signup', user.signup);

  // signin route
  app.post('/api/v1/users/signin', user.signin);
};

export default routes;
