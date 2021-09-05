'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/cub';

let sequelize = new Sequelize(DATABASE_URL);
const productModel = require('./product.model');
const product = productModel(sequelize, DataTypes);
const userModel = require('./users');
const Collection = require('./data-collection');


module.exports = {
  db: sequelize,
  product: new Collection(product),
  users: userModel(sequelize, DataTypes),
};