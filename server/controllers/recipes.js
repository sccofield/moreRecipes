// ssimport models from '../models';
import db from '../models';
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
  static addRecipe(req, res) {
    if (!(req.body.title && req.body.ingredients && req.body.description)) {
      return res.status(500).json({
        message: 'Please fill in all the details.'
      });
    }
    db.Recipe.create({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      userId: req.decoded.id
    })
      .then(recipes => res.status(201).send({
        recipe: recipes,
        message: 'recipe created'
      }))
      .catch(error => res.status(500).send(error.toString()));
  }

  /**
   * edit new recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  static modifyRecipe(req, res) {
    const { id } = req.params;
    db.Recipe.findOne({ where: { id, userId: req.decoded.id } })
      .then((recipe) => {
        recipe.update({
          title: req.body.title || recipe.title,
          description: req.body.description || recipe.description,
          ingredients: req.body.ingredients || recipe.ingredients,
        })
          .then(updatedRecipe => res.status(200).json({
            status: 'success',
            recipe: updatedRecipe
          }))
          .catch(error => res.status(500).send(error.toString()));
      })
      .catch(() => res.status(400).send('You don\'t have access to edit that recipe or it dosen\'t exits'));
  }

// })
}


export default RecipeController;
