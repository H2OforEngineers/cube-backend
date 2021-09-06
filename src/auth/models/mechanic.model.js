'use strict';

const mechanicModel = (sequelize, DataTypes) => sequelize.define('mechanic', {
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING},
});

module.exports = mechanicModel;