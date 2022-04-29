const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Userslockerfavoris extends Model {};

Userslockerfavoris.init({

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    

}, {

    sequelize: sequelize,

    tableName: 'userslockerfavoris',

    timestamps: false
});

module.exports = Userslockerfavoris;