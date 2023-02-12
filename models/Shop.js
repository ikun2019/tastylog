const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Shop = sequelize.define('t_shop', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kana: {
    type: Sequelize.STRING,
    allowNull: false
  },
  post_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  holiday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price_range: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  geolocation_latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  geolocation_longtude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = Shop;