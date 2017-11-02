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

var saltRounds = 10;

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
      if (req.body.password !== req.body.cPassword) {
        return res.status(500).json({
          status: 'Error',
          message: 'password do not match'
        });
      }

      _models2.default.User.create({
        userName: req.body.username,
        email: req.body.email,
        password: _bcrypt2.default.hashSync(req.body.password, saltRounds)
      }).then(function (user) {
        return res.status(201).json({
          status: 'success',
          message: 'user with id ' + user.id + ' has been created'
        });
      }).catch(function (error) {
        return res.status(500).json({
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
      if (!req.body.email) {
        return res.status(400).send({
          status: 'Error',
          message: 'Please input your email'
        });
      }
      if (!req.body.password) {
        return res.status(400).send({
          status: 'Error',
          message: 'Please input your password'
        });
      }
      _models2.default.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user) {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            message: 'invalid login details'
          });
        }
        if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
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
        return res.status(500).json({
          status: 'fail',
          message: error.errors[0].message
        });
      });
    }
    /**
     * get user
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      var id = parseInt(req.params.id, 10);
      if (id === req.decoded.id || req.decoded.id === 1) {
        _models2.default.User.findOne({
          where: {
            id: req.params.id
          }
        }).then(function (user) {
          if (user) {
            return res.status(200).json({
              status: 'success',
              data: user
            });
          }
          return res.status(500).json({
            status: 'Error',
            message: 'user does not exist'
          });
        }).catch(function (error) {
          return res.status(500).json({
            status: 'fail',
            message: error.errors[0].message
          });
        });
      } else {
        return res.status(500).json({
          status: 'Fail',
          message: 'You don\'t have privilledge to view this user'
        });
      }
    }
    /**
     * get user
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @returns {json} json
     * @memberof userController
     */

  }, {
    key: 'getAllUser',
    value: function getAllUser(req, res) {
      if (req.decoded.id === 1) {
        _models2.default.User.findAll().then(function (users) {
          return res.status(200).json({
            status: 'success',
            data: users
          });
        }).catch(function (error) {
          return res.status(500).json({
            status: 'fail',
            message: error
          });
        });
      } else {
        return res.status(500).json({
          status: 'Error',
          message: 'You don\'t have priviledge for this action'
        });
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;