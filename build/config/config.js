'use strict';

require('dotenv').config();

var environment = process.NODE_ENV || 'development';
var dialect = 'postgres';
var url = process.env.DATABASE_URL + '_' + environment;

process.env.DATABASE_URL = url;

var devMode = environment === ('development' || 'test');

var config = {
  url: url,
  dialect: dialect,
  logging: devMode ? function (log) {
    return log;
  } : false,
  dialectOptions: {
    multipleStatements: true
  }
};

if (!devMode) {
  config.ssl = true;
  config.dialectOptions.ssl = {
    require: !devMode
  };
}
module.exports = config;