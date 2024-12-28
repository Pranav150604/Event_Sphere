const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your database configuration

const Payment = sequelize.define('Payment', {
  pid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  oid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders', // Name of the order model/table
      key: 'id', // Primary key of the order model/table
    },
  },
  pdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pamount: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false,
  },
}, {
  timestamps: false, // Set to true if you want to add timestamps
  tableName: 'payments', // Name of the table
});

module.exports = Payment; 