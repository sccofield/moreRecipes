import * as Recipe from './controllers/recipes';

const recipe = new Recipe.default();

const routes = (app) => {
  // post recipe route
  app.post('/api/v1/recipes', recipe.postRecipe);
};

export default routes;
