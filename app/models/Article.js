const {
    timeStamp
} = require('console');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const sequelize = require('../../data/database');

class Article extends Model {};

Article.init({

    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    visual_0: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visual_1: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visual_2: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visual_3: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {

    sequelize: sequelize,

    tableName: 'article',

    timestamps: false
});

module.exports = Article;