import * as Recipe from './controllers/recipes';

const recipe = new Recipe.default();

const routes = (app) => {
  // post recipe route
  app.post('/api/v1/recipes', recipe.postRecipe);

  // edit recipe
  app.put('/api/v1/recipes/:id', recipe.editRecipe);
};

export default routes;
