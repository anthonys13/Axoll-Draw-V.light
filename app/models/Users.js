const { timeStamp } = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Users extends Model {};

Users.init({

    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'user'
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    prenom: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pays: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ville: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    adresse: {
        type: DataTypes.TEXT,
        allowNull: true
    },


}, {

    sequelize: sequelize,

    tableName: 'users',

    timestamps: false
});

module.exports = Users;