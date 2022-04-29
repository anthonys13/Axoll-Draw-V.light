require('dotenv').config();

const sequelize = require('../../data/database');

const Article = require('../models/Article');
const Affiche = require('../models/Affiche');

const mainController = {

  /*-----------------------|---------------|-------------------------*/
  /*                       |    Accueil    |                        */
  /*-----------------------|---------------|-----------------------*/

  async homePage(req, res) {

    try {
      // je récupére tout les article de la bdd
      const articleCarousHome = await Affiche.findAll();
      // console.log(articleCarousHome)

      let articleRecent;
      // condition si click sur le menu categories
      // if (req.query.categories) {
        // j'affiche tout les article recent, demandé, de la bdd trié categories 
        articleRecent = await Article.findAll({
          
          order: [['created_at', 'DESC']],
          limit: 4
          
        });

        // console.log('req',req.query.categories)
        // console.log('article',articleRecent)
      // } else {
        // j'affiche tout les article de la bdd trié par date d'ajout et limité a 4 maxi
        articleRecent = await Article.findAll({
          order: [['created_at', 'DESC']],
          limit: 4
        });
        // console.log(articleRecent)
      // }

      let articleTout;
      if (req.query.categories) {
        // j'affiche tout les article trié par categories
        articleTout = await Article.findAll({
          where: {
            category: req.query.categories
          }
        });
      } else {
        // j'affiche tout les article
        articleTout = await Article.findAll({
          // order: sequelize.random()
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
      // console.log(categories);

      return res.render('home', {
        articleRecent,
        articleCarousHome,
        articleTout,
        categories,
        title1: 'Nouveauté',
        title2: 'Tout les articles'
      });

      console.log(req.session)

    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  /*-----------------------|----------------|-------------------------*/
  /*                       | Detailsarticle |                        */
  /*-----------------------|----------------|-----------------------*/

  async articlePage(req, res, next) {
    try {
      // je recupére l'id de l'url
      const urlArticleId = parseInt(req.params.id, 10);

      if (Number.isNaN(urlArticleId)) {
        next();
      }

      // j'affiche un article en fonction de l'url
      const oneArticle = await Article.findAll({
        where: {
          id: urlArticleId
        }
      });
      // console.log(oneArticle);

      if (!oneArticle) {
        next();
      }

      // je récupére les categore par articles et les trie avec un compteur pour chaqu'une 
      const categories = await Article.findAll({
        attributes: [
          ['category', 'label'],
          [sequelize.fn('COUNT', sequelize.col('category')), 'tot']
        ],
        group: 'category'
      });
      // console.log(categories);

      if (!categories) {
        next();
      }

      return res.render('article', {
        oneArticle: oneArticle[0],
        categories,
      });

    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  error404(req, res) {
    res.status(404).render('error404', {
      url: req.url
    });
  },

};

module.exports = mainController;