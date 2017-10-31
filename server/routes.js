import * as Recipe from './controllers/recipes';
import userController from './controllers/users';

const user = new userController();

const recipe = new Recipe.default();

const routes = (app) => {
  // post recipe route
  app.post('/api/v1/recipes', recipe.postRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', recipe.editRecipe);

  // delete recipe
  app.delete('/api/v1/recipes/:id', recipe.deleteRecipe);

  // Get all recipes
  app.get('/api/v1/recipes', recipe.getAllRecipes);

  // Add review
  app.post('/api/v1/recipes/:id/reviews', recipe.addReview);

  app.post('/api/v1/users/signup', user.signup);

  // signin route
  app.post('/api/v1/users/signin', user.signin);
};

export default routes;
