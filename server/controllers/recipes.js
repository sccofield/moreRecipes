import recipes from '../models/Recipes';

/**
 * @class RecipeController
 */
class RecipeController {
  /**
   * creates new recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  postRecipe(req, res) {
    const id = recipes.length + 1;
    const { author } = req.body;
    const { title } = req.body;
    const created = new Date();
    const { description } = req.body;
    const ingredients = req.body.ingredients.split(',');

    // validation to ensure all fields are available
    if (!author) {
      return res.status(400).send('Recipe has no author.');
    }

    if (!title) {
      return res.status(400).send('Recipe has no title.');
    }

    if (!ingredients) {
      return res.status(400).send('Recipe has no ingredients.');
    }

    if (!description) {
      return res.status(400).send('Recipe has no description.');
    }

    const newRecipe = {
      id,
      author,
      title,
      created,
      ingredients: [ingredients],
      description,
      votes: 0,
      reviews: []
    };

    recipes.push(newRecipe);

    return res.status(201).json({
      status: 'success',
      message: 'Recipe added',
      recipe: recipes
    });
  }
}

export default RecipeController;
