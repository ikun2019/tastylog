const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const LoginHistory = sequelize.define('t_login_history', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  login: {
    type: Sequelize.DATE,
    allowNull: false
  },
  host_name: {
    type: Sequelize.STRING
  },
  user_agent: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true
});

module.exports = LoginHistory;