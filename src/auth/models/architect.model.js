'use strict';

const architectModel = (sequelize, DataTypes) => sequelize.define('architect', {
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  phoneNumber: { type: DataTypes.STRING},
});

module.exports = architectModel;