'use strict';

const mechanicModel = (sequelize, DataTypes) => sequelize.define('mechanic', {
  name: { type: DataTypes.STRING, required: true },
  category: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING },
  inStock: { type: DataTypes.INTEGER},
  image: { type: DataTypes.STRING},
  phoneNumber: { type: DataTypes.STRING, required: true },
  price: { type: DataTypes.STRING},

});

module.exports = mechanicModel;