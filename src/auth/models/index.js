'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL;

// let sequelizeOptions = {
//   dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       }
//     }
// };

let sequelize = new Sequelize(DATABASE_URL);



const mechanicModel = require('./mechanic.model');
const electricModel = require('./electric.model');
const architectModel = require('./architect.model');
const civilModel = require('./civil.model');
const Collection = require('./data-collection');

const mechanic = mechanicModel(sequelize, DataTypes);
const electric = electricModel(sequelize, DataTypes);
const architect = architectModel(sequelize, DataTypes);
const civil = civilModel(sequelize, DataTypes);



const userModel = require('./users');


module.exports = {
  db: sequelize,
  mechanic: new Collection(mechanic),
  electric: new Collection(electric),
  architect: new Collection(architect),
  civil: new Collection(civil),
  users: userModel(sequelize, DataTypes),
};