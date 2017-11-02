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

  /**
   * delete recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  static deleteRecipe(req, res) {
    const { id } = req.params;

    db.Recipe.findOne({ where: { id, userId: req.decoded.id } })
      .then((recipe) => {
      // if (!recipe) res.status(404).send({ message: 'recipe Not Found' });
        recipe.destroy()
          .then(() => res.status(200).json({
            status: 'success',
            message: 'Recipe deleted'
          }))
          .catch(error => res.status(500).json({
            status: 'fail',
            message: error
          }));
      })
      .catch(() => res.status(400).json({
        status: 'fail',
        message: 'Recipe dosen\'t exist or you don\'t have privilledge for that action'

      }));
  }

  /**
   * get all recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  static getAllRecipes(req, res) {
    if (req.query.sort) {
      db.Recipe.findAll({ order: [['votes', 'DESC']] })
        .then((recipes) => {
          res.status(200).json({
            status: 'success',
            recipes,
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: 'fail',
            message: error
          });
        });
    } else {
      db.Recipe.findAll()
        .then((recipes) => {
          res.status(200).json({
            status: 'success',
            recipes,
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: 'fail',
            message: error
          });
        });
    }
  }

  /**
   * add review
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof RecipeController
   */
  static addReview(req, res) {
    if (!(req.body.review)) {
      return res.status(500).json({
        status: 'fail',
        message: 'Please enter a review.'
      });
    }

    const { id } = req.params;

    db.Recipe.findOne({ where: { id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({ status: 'fail', message: 'Recipe dose not exist' });
        }
        db.Review.create({
          recipeId: id,
          userId: req.decoded.id,
          review: req.body.review,
        })
          .then(review => res.status(201).send({
            message: 'review created',
            review
          }))
          .catch(error => res.status(500).json({ status: 'fail', message: error }));
      })
      .catch(error => res.status(400).json({ status: 'fail', message: error }));
  }


// })
}

export default RecipeController;
