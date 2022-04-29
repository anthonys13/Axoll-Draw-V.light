const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Historiquevente extends Model {};

Historiquevente.init({

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    visual_0: {
        type: DataTypes.TEXT,
        allowNull: true
    },


}, {

    sequelize: sequelize,

    tableName: 'historiquevente',

    timestamps: false
});

module.exports = Historiquevente;