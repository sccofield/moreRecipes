'use strict';

require('dotenv').config();

var config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true
  },
  production: {
    connection_uri: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};

module.exports = config;