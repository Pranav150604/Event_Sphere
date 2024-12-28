const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('event_management', 'yourusername', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
