const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Event = sequelize.define('Event', {
    eid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    location: { type: DataTypes.STRING },
    organizer_id: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING},
}, {
    timestamps: false,
    tableName: 'events'
});

module.exports = Event;
