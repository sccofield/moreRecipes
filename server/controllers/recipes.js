import db from '../models';
import { searchRecipes, sortSearch, checkId } from './helpers';


/**
 * @class RecipeController
 */
class RecipeController {
  /**
   * creates new recipe
   * @param {object} req express req object
   * @param {object} res express res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static addRecipe(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input recipe title'
      });
    }

    if (!req.body.ingredients) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input recipe ingredients'
      });
    }

    if (!req.body.description) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input recipe description'
      });
    }

    db.Recipe.create({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      userId: req.decoded.id,
      imageUrl: req.body.imageUrl || 'https://bit.ly/2tmU8cc',
      userName: req.decoded.userName
    })
      .then(recipes => res.status(201).send({
        recipe: recipes,
        message: 'recipe created'
      }))
      .catch(error => res.status(500).send(error.toString()));
  }

  /**
   * edit recipe
   * @param {object} req express req object
   * @param {object} res express res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static modifyRecipe(req, res) {
    const { id } = req.params;
    checkId(req, res, id);
    if (req.body.vote || req.body.views) {
      return res.status(401).json({
        status: 'Error',
        message: 'You are not allowed to edit that field.'
      });
    }
    db.Recipe.findOne({ where: { id, userId: req.decoded.id } })
      .then((recipe) => {
        recipe.update({
          title: req.body.title || recipe.title,
          description: req.body.description || recipe.description,
          ingredients: req.body.ingredients || recipe.ingredients,
          imageUrl: req.body.imageUrl || recipe.imageUrl,
        })
          .then(updatedRecipe => res.status(201).json({
            status: 'success',
            recipe: updatedRecipe
          }))
          .catch(error => res.status(500).json({
            status: 'Error',
            message: error
          }));
      })
      .catch(() => res.status(401).json({
        status: 'Error',
        message: 'You don\'t have access to edit that recipe'
      }));
  }

  /**
   * delete recipe
   * @param {object} req express req object
   * @param {object} res express res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static deleteRecipe(req, res) {
    const { id } = req.params;
    checkId(req, res, id);

    db.Recipe.findOne({ where: { id, userId: req.decoded.id } })
      .then((recipe) => {
        recipe.destroy()
          .then(() => res.status(200).json({
            status: 'success',
            message: 'Recipe deleted'
          }))
          .catch(() => res.status(400).json({
            status: 'Error',
            message: 'Recipe dosen\'t exist'
          }));
      })
      .catch(() => res.status(400).json({
        status: 'Error',
        message: 'Recipe dosen\'t exist'
      }));
  }

  /**
   * get all recipe
   * @param {object} req express req object
   * @param {object} res express res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static getAllRecipes(req, res) {
    if (req.query.search) {
      return searchRecipes(req, res, req.query.search);
    }
    if (req.query.sort) {
      return sortSearch(req, res);
    }
    db.Recipe.findAndCountAll().then((all) => {
      const limit = 6;
      let offset = 0;
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = all.count;
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);

      db.Recipe.findAll({
        limit,
        offset,
        include: [{
          model: db.Review
        },
        {
          model: db.Favorite,
          attributes: ['userId', 'recipeId']
        },
        {
          model: db.Upvote,
          attributes: ['userId', 'recipeId']
        },
        {
          model: db.Downvote,
          attributes: ['userId', 'recipeId']
        }
        ]
      })
        .then((recipes) => {
          res.status(200).json({
            status: 'success',
            numberOfItems,
            limit,
            pages,
            recipes,
            currentPage: page
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: 'fail',
            message: error
          });
        });
    });
  }

  /**
 *
 *
 * Get home recipes
 * @param {any} req
 * @param {any} res
 *
 * @memberof RecipeController
 * @returns {json} json
 */
  static homeRecipes(req, res) {
    db.Recipe.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3,
      include: [{
        model: db.Review
      },
      {
        model: db.Favorite,
        attributes: ['userId', 'recipeId']
      },
      {
        model: db.Upvote,
        attributes: ['userId', 'recipeId']
      },
      {
        model: db.Downvote,
        attributes: ['userId', 'recipeId']
      }
      ]
    })
      .then((latestRecipes) => {
        db.Recipe.findAll({
          order: [['votes', 'DESC']],
          limit: 3,
          include: [{
            model: db.Review
          },
          {
            model: db.Favorite,
            attributes: ['userId', 'recipeId']
          },
          {
            model: db.Upvote,
            attributes: ['userId', 'recipeId']
          },
          {
            model: db.Downvote,
            attributes: ['userId', 'recipeId']
          }
          ]
        }).then((popularRecipes) => {
          res.json({
            latestRecipes,
            popularRecipes
          });
        });
      });
  }


  /**
   * get single recipe
   * @param {object} req expres req object
   * @param {object} res exp res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static getRecipe(req, res) {
    const { id } = req.params;
    checkId(req, res, id);
    db.Recipe.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.Review
      },
      {
        model: db.Favorite,
        attributes: ['userId', 'recipeId']
      },
      {
        model: db.Upvote,
        attributes: ['userId', 'recipeId']
      },
      {
        model: db.Downvote,
        attributes: ['userId', 'recipeId']
      }
      ]
    })
      .then((recipe) => {
        if (recipe) {
          res.status(200).json({
            status: 'success',
            recipe
          });
        } else {
          return res.status(400).json({
            status: 'Error',
            message: 'Recipe dose not exist'
          });
        }
      })
      .catch(error => res.status(500).json({
        status: 'fail',
        message: error.errors[0].message
      }));
  }

  /**
 * get all user recipes
 * @param {object} req expres req object
 * @param {object} res expres res object
 *
 * @returns {json} json
 * @memberof RecipeController
 */
  static getAllUserRecipes(req, res) {
    db.User.findOne({
      where: {
        id: req.decoded.id
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'A user with that id is not found',
        });
      }
      if (req.query.page && req.query.page < 0) {
        return res.status(501).send({
          message: 'Page cannot be negative'
        });
      }
      db.Recipe.findAndCountAll({
        where: {
          userId: req.decoded.id
        }
      }).then((all) => {
        const limit = 6;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        db.Recipe.findAll({
          where: {
            userId: req.decoded.id
          },
          limit,
          offset,
          order: [['createdAt', 'DESC']]
        })
          .then(allRecipes => res.status(200)
            .json({
              status: 'success',
              recipes: allRecipes,
              limit,
              numberOfItems,
              pages,
              currentPage: page

            }))
          .catch(() => res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          }));
      });
    });
  }


  /**
   * add review
   * @param {object} req express req object
   * @param {object} res express res object
   *
   * @returns {json} json
   * @memberof RecipeController
   */
  static addReview(req, res) {
    if (!(req.body.review)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Please enter a review.'
      });
    }

    const { id } = req.params;

    db.Recipe.findOne({ where: { id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({
            status: 'Error', message: 'Recipe dose not exist'
          });
        }
        db.Review.create({
          recipeId: id,
          userId: req.decoded.id,
          review: req.body.review,
          userName: req.decoded.userName
        })
          .then(review => res.status(201).send({
            message: 'review created',
            review
          }))
          .catch(error => res.status(500).json({
            status: 'fail', message: error
          }));
      })
      .catch(() => res.status(500).json({
        status: 'fail', message: 'Recipe dose not exist'
      }));
  }
}

export default RecipeController;
