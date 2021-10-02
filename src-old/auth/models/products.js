'use strict';

const mechanicModel = (sequelize, DataTypes) => sequelize.define('products', {
  name: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING,  },
  inStock: { type: DataTypes.STRING, },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING , required: true},
});

module.exports = mechanicModel;