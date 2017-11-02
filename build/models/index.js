'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default(_config2.default.url, _config2.default);
var database = {};

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  var model = sequelize.import('./' + file);
  database[model.name] = model;
});

Object.keys(database).forEach(function (model) {
  if (database[model].associate) {
    database[model].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = _sequelize2.default;

exports.default = database;