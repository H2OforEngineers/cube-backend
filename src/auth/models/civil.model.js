'use strict';

const civilModel = (sequelize, DataTypes) => sequelize.define('civil', {
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING},
});

module.exports = civilModel;