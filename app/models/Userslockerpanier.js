const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');
const Article = require('../models/Article');

class Userslockerpanier extends Model {};

Userslockerpanier.init({

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


}, {

    sequelize: sequelize,

    tableName: 'userslockerpanier',

    timestamps: false

});

module.exports = Userslockerpanier;


