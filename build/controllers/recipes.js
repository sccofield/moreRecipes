'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // ssimport models from '../models';


var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class RecipeController
 */
var RecipeController = function () {
  function RecipeController() {
    _classCallCheck(this, RecipeController);
  }

  _createClass(RecipeController, null, [{
    key: 'addRecipe',

    /**
     * creates new recipe
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof RecipeController
     */
    value: function addRecipe(req, res) {
      if (!(req.body.title && req.body.ingredients && req.body.description)) {
        return res.status(500).json({
          message: 'Please fill in all the details.'
        });
      }
      _models2.default.Recipe.create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        userId: req.decoded.id
      }).then(function (recipes) {
        return res.status(201).send({
          recipe: recipes,
          message: 'recipe created'
        });
      }).catch(function (error) {
        return res.status(500).send(error.toString());
      });
    }

    /**
     * edit new recipe
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof RecipeController
     */

  }, {
    key: 'modifyRecipe',
    value: function modifyRecipe(req, res) {
      var id = req.params.id;

      _models2.default.Recipe.findOne({ where: { id: id, userId: req.decoded.id } }).then(function (recipe) {
        recipe.update({
          title: req.body.title || recipe.title,
          description: req.body.description || recipe.description,
          ingredients: req.body.ingredients || recipe.ingredients
        }).then(function (updatedRecipe) {
          return res.status(200).json({
            status: 'success',
            recipe: updatedRecipe
          });
        }).catch(function (error) {
          return res.status(500).send(error.toString());
        });
      }).catch(function () {
        return res.status(400).send('You don\'t have access to edit that recipe or it dosen\'t exits');
      });
    }

    /**
     * delete recipe
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof RecipeController
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      var id = req.params.id;


      _models2.default.Recipe.findOne({ where: { id: id, userId: req.decoded.id } }).then(function (recipe) {
        // if (!recipe) res.status(404).send({ message: 'recipe Not Found' });
        recipe.destroy().then(function () {
          return res.status(200).json({
            status: 'success',
            message: 'Recipe deleted'
          });
        }).catch(function (error) {
          return res.status(500).json({
            status: 'fail',
            message: error
          });
        });
      }).catch(function () {
        return res.status(400).json({
          status: 'fail',
          message: 'Recipe dosen\'t exist or you don\'t have privilledge for that action'

        });
      });
    }

    /**
     * get all recipe
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof RecipeController
     */

  }, {
    key: 'getAllRecipes',
    value: function getAllRecipes(req, res) {
      if (req.query.sort) {
        _models2.default.Recipe.findAll({ order: [['votes', 'DESC']] }).then(function (recipes) {
          res.status(200).json({
            status: 'success',
            recipes: recipes
          });
        }).catch(function (error) {
          res.status(500).json({
            status: 'fail',
            message: error
          });
        });
      } else {
        _models2.default.Recipe.findAll().then(function (recipes) {
          res.status(200).json({
            status: 'success',
            recipes: recipes
          });
        }).catch(function (error) {
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

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      if (!req.body.review) {
        return res.status(500).json({
          status: 'fail',
          message: 'Please enter a review.'
        });
      }

      var id = req.params.id;


      _models2.default.Recipe.findOne({ where: { id: id } }).then(function (recipe) {
        if (!recipe) {
          return res.status(400).json({ status: 'fail', message: 'Recipe dose not exist' });
        }
        _models2.default.Review.create({
          recipeId: id,
          userId: req.decoded.id,
          review: req.body.review
        }).then(function (review) {
          return res.status(201).send({
            message: 'review created',
            review: review
          });
        }).catch(function (error) {
          return res.status(500).json({ status: 'fail', message: error });
        });
      }).catch(function (error) {
        return res.status(400).json({ status: 'fail', message: error });
      });
    }

    // })

  }]);

  return RecipeController;
}();

exports.default = RecipeController;