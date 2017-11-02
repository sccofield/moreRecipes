require('dotenv').config();

const environment = process.NODE_ENV || 'development';
const dialect = 'postgres';
const url = `${process.env.DATABASE_URL}_${environment}`;

process.env.DATABASE_URL = url;

const devMode = environment === ('development' || 'test');

const config = {
  url,
  dialect,
  logging: devMode ? log => log : false,
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
