import * as Recipe from './controllers/recipes';

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
};

export default routes;
