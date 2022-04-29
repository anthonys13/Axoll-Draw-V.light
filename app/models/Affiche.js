const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Affiche extends Model {};

Affiche.init({

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_1: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_2: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_3: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_4: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_5: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visual_6: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {

    sequelize: sequelize,

    tableName: 'affiche',

    timestamps: false

});

module.exports = Affiche;