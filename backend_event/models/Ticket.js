const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ticket = sequelize.define('Ticket', {
    tid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event_id: { type: DataTypes.STRING, allowNull: false },
    ticket_type: {type: DataTypes.STRING, allowNull:false},
    ticket_description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER},
}, {
    timestamps: false,
    tableName: 'tickets'
});

module.exports = Ticket;
