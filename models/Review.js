const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('t_review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  visit: {
    type: Sequelize.DATE,
    allowNull: true
  },
  rate: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
},{
  freezeTableName: true
});

module.exports = Review;