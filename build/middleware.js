'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class middleware
 */
var Middleware = function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, null, [{
    key: 'verify',

    /**
     * token check
     * @param {object} req expres req object
     * @param {object} res exp res object
     * @param {object} next exp next object
     * @returns {json} json
     * @memberof Middleware
     */
    value: function verify(req, res, next) {
      var token = req.body.token || req.query.token || req.headers.token;
      console.log(req.headers);
      if (token) {
        _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
          if (err) {
            return res.json({
              status: 'fail',
              message: 'Failed to authenticate token.'
            });
          }
          req.decoded = decoded;
          // console.log(req.decoded);
          // console.log(req.decoded.id);
          next();
        });
      } else {
        return res.status(401).json({
          status: 'fail',
          message: 'No token provided.'
        });
      }
    }
    // /**
    //  * check if user is admin
    //  * @param {object} req expres req object
    //  * @param {object} res exp res object
    //  * @param {object} next exp next object
    //  * @returns {json} json
    //  * @memberof Middleware
    //  */
    // static isAdmin(req, res, next) {
    //   if (req.params.id === 1) {
    //     return next();
    //   }
    //   return res.status(500).json({
    //     status: 'Error',
    //     message: 'You are not and admin and don\'t have the priviledge'
    //   });
    // }

  }]);

  return Middleware;
}();

exports.default = Middleware;