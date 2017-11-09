require('dotenv').config();
// const { parsed: environmentVariables } = require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
let url;
if (environment === 'test') {
  url = process.env.TEST_DATABASE_URL;
} else {
  url = process.env.DATABASE_URL;
}
// const url = process.env.DATABASE_URL;
// console.log(url);


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
