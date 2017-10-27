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
    const { ingredients } = req.body;

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
      ingredients,
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

  /**
   * edit new recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  editRecipe(req, res) {
    const { id } = req.params;
    let editRecipe;

    recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        recipe.title = req.body.title || recipe.title;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.description = req.body.description || recipe.description;

        editRecipe = recipe;
      }
    });
    if (editRecipe) {
      return res.status(200).json({
        status: 'success',
        message: 'Recipe modified',
        recipe: editRecipe
      });
    }
    return res.status(404).send(`recipe with id ${id} not found`);
  }

  /**
   * delete recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  deleteRecipe(req, res) {
    const { id } = req.params;

    recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        const newRecipes = recipes.filter(data => data.id !== parseInt(id, 10));
        return res.status(200).json({
          status: 'success',
          message: 'Recipe deleted',
          recipe: newRecipes
        });
      }
    });
  }

  /**
   * delete recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  getAllRecipes(req, res) {
    if (req.query.sort === 'upvotes' && req.query.order === 'des') {
      return res.status(200).json({
        status: 'success',
        recipes: recipes.sort((a, b) => b.votes - a.votes)
      });
    }
    return res.status(200).json({
      status: 'success',
      recipes

    });
  }

  /**
   * add review
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  addReview(req, res) {
    const { id } = req.params;
    const { user } = req.body;
    const { review } = req.body;
    const created = new Date();
    let editRecipes;

    const newReview = {
      user,
      review,
      created
    };

    recipes.forEach((recipe) => {
      if (recipe.id === parseInt(id, 10)) {
        recipe.reviews.push(newReview);

        editRecipes = recipe;
      }
    });
    if (editRecipes) {
      return res.status(200).json({
        status: 'success',
        message: 'Review added',
        recipe: editRecipes
      });
    }
    return res.status(404).send(`recipe with id ${id} not found`);
  }
}

export default RecipeController;
