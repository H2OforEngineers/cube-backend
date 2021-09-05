'use strict';

const productModel = (sequelize, DataTypes) => sequelize.define('product', {
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING},
});

module.exports = productModel;