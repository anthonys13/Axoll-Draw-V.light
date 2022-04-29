require('dotenv').config();

const sequelize = require('../../data/database');
const {
    Op
} = require('sequelize');

const Article = require('../models/Article');

const searchController = {


    searchArticle: async function (req, res) {
        //on récupère l'extrait du nom depuis la queryString
        const nameArticle = req.query.name;
        try {
            let articleTout;

            // je render les categorie via le menu
            if (req.query.categories) {
                articleTout = await Article.findAll({
                    where: {
                        category: req.query.categories
                    }
                });
            } else {
                // je render les article via le nom ( une partie du nom suffi )
                articleTout = await Article.findAll({
                    where: {
                        'name': {
                            [Op.iLike]: `%${nameArticle}%`,
                        }
                    }
                });
            }

            // j'affiche le nombre d'article dans chaque categorie et le nom des categories
            const categories = await Article.findAll({
                attributes: [
                    ['category', 'label'],
                    [sequelize.fn('COUNT', sequelize.col('category')), 'tot']
                ],
                group: 'category'
            });

            return res.render('searchedByName', {
                articleTout,
                categories,
                title: `Liste des articles dont le nom contient : "${nameArticle}"`
            });

        } catch (error) {
            console.error(error);
            res.status(500).render('error');
        }
    },

    error404(req, res) {
        res.status(404).render('error404', {
            url: req.url
        });
    },
};

module.exports = searchController;