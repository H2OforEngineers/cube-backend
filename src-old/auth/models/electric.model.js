'use strict';

const electricModel = (sequelize, DataTypes) => sequelize.define('electric', {
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING},
});

module.exports = electricModel;