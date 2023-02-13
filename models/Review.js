const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('t_review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  review: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  freezeTableName: true
});

module.exports = Review;