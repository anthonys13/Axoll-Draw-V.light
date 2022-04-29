require('dotenv').config();

const Users = require('../models/Users');
const Article = require('../models/Article');

const adminController = {

    /*-----------------------|---------------|-------------------------*/
    /*                       |     ADMIN     |                        */
    /*-----------------------|---------------|-----------------------*/

    showArticlePage: async (req, res) => {
        try {

            const getUsers = await Users.findAll({
                where: {
                    email: req.session.user[0].email
                }
            });

            if (getUsers[0].role !== 'admin') {
                return res.render('error403');
            } else {
                return res.render('addArticle');
            }

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    showAdminPage: async (req, res) => {
        try {
            // recuperation du role de l'user en fonction de son adresse mail via la session
            const getUsers = await Users.findAll({
                where: {
                    email: req.session.user[0].email
                }
            });

            const dataUsers = await Users.findAll({
                raw: true,
            });

            // console.log('dataUser', dataUsers);
            // console.log('role',getUsers[0].role);

            // si le role de l'user est different de admin je render une page 404 sinon la page 'admin'
            if (getUsers[0].role !== 'admin') {
                return res.render('error403');
            } else {
                return res.render('admin', {
                    dataUsers
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    addArticle: async (req, res) => {
        try {

            // dans le form de saisie d'un article ( admin uniquement ) si les conditions ci-dessous ne sont pas remplis je render un message d'erreur sinon j'instancie les valeurs de mon req.body
            if (req.body.name === "" || req.body.description === "" || req.body.size === "" || req.body.price === "" || req.body.visual_0 === "" || req.body.visual_1 === "" || req.body.visual_2 === "" || req.body.visual_3 === "" || req.body.category === "") {

                return res.render('addArticle', {
                    error: 'Merci de remplir les champs obligatoires *'
                });

            } else {

                const {
                    name,
                    description,
                    size,
                    price,
                    visual_0,
                    visual_1,
                    visual_2,
                    visual_3,
                    category,
                } = req.body

                // ajout des article en bdd via le from ci-dessus
                await Article.create({
                    name: name,
                    description: description,
                    size: size,
                    price: price,
                    visual_0: visual_0,
                    visual_1: visual_1,
                    visual_2: visual_2,
                    visual_3: visual_3,
                    category: category,
                });

                return res.render('addArticle', {
                    confirm: 'Les ajouts ont bien été pris en compte'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

};

module.exports = adminController;