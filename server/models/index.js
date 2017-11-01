import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(config.url, config);
const database = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(`./${file}`);
    database[model.name] = model;
  });

Object.keys(database).forEach((model) => {
  if (database[model].associate) {
    database[model].associate(database);
  }
});


database.sequelize = sequelize;
database.Sequelize = Sequelize;

export default database;
