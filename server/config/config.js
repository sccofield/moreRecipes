require('dotenv').config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  }
};

module.exports = config;
