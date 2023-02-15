const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('t_user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  locked: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
}, {
  freezeTableName: true
});

module.exports = User;