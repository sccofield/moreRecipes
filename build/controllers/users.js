'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var saltRounds = Number(process.env.SALTROUNDS);

/**
 * @class UserController
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * creates new user
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof UserController
     */
    value: function signup(req, res) {
      var _req$body = req.body,
          userName = _req$body.userName,
          email = _req$body.email,
          password = _req$body.password,
          cPassword = _req$body.cPassword;


      if (!userName) {
        return res.status(400).json({
          status: 'Error',
          message: 'Username is required'
        });
      }

      if (!email) {
        return res.status(400).json({
          status: 'Error',
          message: 'Email is required'
        });
      }

      if (!password) {
        return res.status(400).json({
          status: 'Error',
          message: 'Password is required'
        });
      }

      if (password !== cPassword) {
        return res.status(400).json({
          status: 'Error',
          message: 'Password do not match'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          status: 'Error',
          message: 'Password must be more than 6 characters'
        });
      }

      _models2.default.User.create({
        userName: userName,
        email: email,
        password: _bcrypt2.default.hashSync(req.body.password, saltRounds)
      }).then(function (user) {
        return res.status(201).json({
          status: 'success',
          message: 'user with id ' + user.id + ' has been created'
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 'Error',
          message: error.errors[0].message
        });
      });
    }
    /**
     * authenticate user
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      if (!email) {
        return res.status(400).send({
          status: 'Error',
          message: 'Please input your email'
        });
      }
      if (!password) {
        return res.status(400).send({
          status: 'Error',
          message: 'Please input your password'
        });
      }
      _models2.default.User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            message: 'invalid login details'
          });
        }
        if (!_bcrypt2.default.compareSync(password, user.password)) {
          return res.status(400).send({
            status: 'Error',
            message: 'Incorrect password'
          });
        }
        var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SECRET, { expiresIn: 7200 });
        res.status(200).send({
          status: 'success',
          message: 'Successfully signin',
          data: token
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 'fail',
          message: error.errors[0].message
        });
      });
    }
    /**
     * add favorite
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'addFavorite',
    value: function addFavorite(req, res) {
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(404).json({
            status: 'Error',
            message: 'A recipe with Id ' + req.params.recipeId + ' dose not exist'
          });
        }

        _models2.default.Favorite.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        }).then(function (favorite) {
          if (favorite) {
            return res.status(400).json({
              status: 'Error',
              message: 'You have added this recipe to your favorite already'
            });
          }
          _models2.default.Favorite.create({
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }).then(function () {
            return res.status(201).json({
              status: 'success',
              message: 'Recipe added to favorite'
            });
          }).catch(function () {
            return res.status(500).json({
              status: 'Error',
              message: 'favorite not added. server error'
            });
          });
        }).catch(function () {
          return res.status(500).json({
            status: 'Error',
            message: 'favorite not added. server error'
          });
        });
      }).catch(function () {
        return res.status(500).json({
          status: 'Error',
          message: 'favorite not added. server error'
        });
      });
    }
    /**
     * get favorite
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'getFavorite',
    value: function getFavorite(req, res) {
      _models2.default.Favorite.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [{
          model: _models2.default.Recipe, attributes: ['title', 'ingredients', 'description']
        }]
      }).then(function (favorite) {
        if (favorite && Object.keys(favorite).length !== 0) {
          return res.status(200).json({
            status: 'success',
            message: 'favorites',
            data: favorite
          });
        }
        return res.status(404).json({
          status: 'Error',
          message: 'You don\'t have any favorites'
        });
      }).catch(function (error) {
        return res.status(500).json({
          status: 'Error',
          message: error
        });
      });
    }
    /**
     * add upvote
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'upvote',
    value: function upvote(req, res) {
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(404).json({
            status: 'Error',
            message: 'Recipe dose not exist'
          });
        }
        _models2.default.Upvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        }).then(function (vote) {
          if (vote) {
            return res.status(400).json({
              status: 'Error',
              message: 'Recipe has already been upvoted by you.'
            });
          }
          _models2.default.Upvote.create({
            userId: req.decoded.id,
            recipeId: req.params.recipeId,
            vote: true
          }).then(function () {
            _models2.default.Recipe.findById(req.params.recipeId).then(function (found) {
              found.increment('votes');
              return res.status(201).json({
                staus: 'success',
                message: 'Recipe upvoted'
              });
            }).catch(function (error) {
              res.status(500).json({
                status: 'Error',
                message: error
              });
            });
          });
        }).catch(function (error) {
          res.status(500).json({
            status: 'Error',
            message: error
          });
        });
      }).catch(function (error) {
        res.status(500).json({
          status: 'Error',
          message: error
        });
      });
    }
    /**
     * add downvote
     * @param {object} req express req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'downvote',
    value: function downvote(req, res) {
      _models2.default.Recipe.findById(req.params.recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(400).json({
            status: 'Error',
            message: 'Recipe dose not exist'
          });
        }
        _models2.default.Downvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        }).then(function (vote) {
          if (vote) {
            return res.status(400).json({
              status: 'Error',
              message: 'Recipe has already been downvoted by you.'
            });
          }
          _models2.default.Downvote.create({
            userId: req.decoded.id,
            recipeId: req.params.recipeId,
            vote: true
          }).then(function () {
            _models2.default.Recipe.findById(req.params.recipeId).then(function (found) {
              found.decrement('votes');
              return res.status(201).json({
                staus: 'success',
                message: 'Recipe downvoted'
              });
            }).catch(function (error) {
              res.status(500).json({
                status: 'Error',
                message: error
              });
            });
          });
        }).catch(function (error) {
          res.status(500).json({
            status: 'Error',
            message: error
          });
        });
      }).catch(function (error) {
        res.status(500).json({
          status: 'Error',
          message: error
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;