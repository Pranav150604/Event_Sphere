const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
    oid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    eid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'events',
            key: 'eid'
        }
    },
    tid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tickets',
            key: 'ticket_id'
        }
    },
    order_quantity: {type: DataTypes.INTEGER, allowNull: false},
    total_price: {type: DataTypes.DECIMAL(10, 2),allowNull: false},
    order_date: {type: DataTypes.DATE,allowNull: false,defaultValue: DataTypes.NOW}
}, {
    timestamps: false,
    tableName: 'orders'
});

module.exports = Order;
