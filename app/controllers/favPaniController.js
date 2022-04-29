require("dotenv").config();

const {
    Article,
    Userslockerpanier,
    Userslockerfavoris,
} = require("../models/index.js");

const favPaniController = {

    /*-----------------------|---------------|-------------------------*/
    /*                       |    FAVORIS    |                        */
    /*-----------------------|---------------|-----------------------*/

    favPage: async (req, res) => {
        try {
            // selection de tout les favoris dans la bdd en fonction de l'user mail a la connection
            const getMyFavs = await Userslockerfavoris.findAll({
                attributes: ["article_id"],
                where: {
                    user_id: `${req.session.user[0].id}`,
                },
            });
            // console.log('getMyFavs', req.session.user[0].email);

            if (Number(getMyFavs.length) !== 0 || getMyFavs.length !== NaN) {
                // je fait une jointure pour recuperer les favoris push en bdd et les afficher dans la view favoris
                const renderMyFavs = await Article.findAll({
                    include: {
                        model: Userslockerfavoris,
                        as: "favoris",
                        required: true,
                        where: {
                            user_id: `${req.session.user[0].id}`,
                        },
                    },
                });

                console.log(req.session.user[0].id);

                // je compte le nombre du favoris via la longeur de ma table en bdd
                const nombreArticleFav = Number(renderMyFavs.length);
                // console.log('nbr favs', nombreArticleFav)

                return res.render("favoris", {
                    renderMyFavs,
                    nombreArticleFav,
                    title: "Mes favoris",
                });
            } else {
                return res.redirect("/");
                console.log("Vous n'avez pas de favoris");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    addFavPage: async (req, res, next) => {
        try {
            // je récupère l'id de mon url et l'user mail de connection
            const urlArticleId = parseInt(req.params.id, 10);
            const userEmail = req.session.user;
            // console.log(`your email: ${userEmail[0].email}`)

            if (Number.isNaN(urlArticleId)) {
                next();
            }

            // je recupére tout les favoris en fonction de l'user connecter via le mail en session
            const gestMyfavsID = await Userslockerfavoris.findAll({
                attributes: ["article_id"],
                where: {
                    user_id: `${req.session.user[0].id}`,
                },
            });

            // je crée un tableau vide et je push l'id en fonction de l'email
            const emailArticleList = [];

            for (const Myfavs of gestMyfavsID) {
                emailArticleList.push(Myfavs.article_id);
            }

            // console.log('tab Id Article', emailArticleList);

            // je passe la longeur de ma table en NUMBER pour la comparer a "0" et comparer si mon tableau n'est pas un NaN
            if (Number(gestMyfavsID.length) > 0 || gestMyfavsID.length !== NaN) {
                // je verifie si l'id de l'url est inclu dans mon tableau
                if (emailArticleList.includes(urlArticleId)) {
                    console.log("Already ADD!");
                    return res.redirect('back');
                } else {
                    await Userslockerfavoris.create({
                        user_id: userEmail[0].id,
                        article_id: urlArticleId,
                    });

                    // console.log("user_email", userEmail[0].email);
                    // console.log("urlid", urlArticleId);

                    console.log("Success ADD!");
                    return res.redirect('back');
                }

                // si les conditions sur premier IF ne sont pas remplis cela veux dire que je n'est rien en favoris, je crée un push en bdd avec l'email de l'user et l'id de l'article
            } else {
                await Userslockerfavoris.create({
                    user_id: userEmail[0].id,
                    article_id: urlArticleId,
                });

                // console.log("user_email", userEmail[0].email);
                // console.log("urlid", urlArticleId);

                // await sequelize.query(`DELETE FROM userslockerfavoris t1
                // USING userslockerfavoris t2
                // WHERE t1.user_email = t2.user_email
                // AND t1.article_id = t2.article_id
                // AND t1.id > t2.id;`);

                console.log("Ajout reussi");
                return res.redirect('back');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // Je recupére l'id de l'url et je supprime "1" élément de mon tableau
    // en fonction de l'index (l'index correspond a l'id de mon url)
    favDeleteArticle: async (req, res) => {
        try {
            const favoriteIndex = parseInt(req.params.id, 10);

            await Userslockerfavoris.destroy({
                where: {
                    user_id: `${req.session.user[0].id}`,
                    article_id: favoriteIndex,
                },
            });
            // console.log(deleteid)

            return res.redirect("/favoris");
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    /*-----------------------|---------------|-------------------------*/
    /*                       |    PANNIER    |                        */
    /*-----------------------|---------------|-----------------------*/

    // Meme principe que pour les panier
    panierPage: async (req, res, next) => {
        try {
            // selection de tout les panier dans la bdd en fonction de l'user mail a la connection
            const getMyPani = await Userslockerpanier.findAll({
                attributes: ["article_id"],
                where: {
                    user_id: `${req.session.user[0].id}`,
                },
            });
            // console.log('getMyPani', req.session.user[0].email);

            // je passe la longeur de ma table en NUMBER pour la comparer a "0" et comparer si mon tableau n'est pas un NaN
            if (Number(getMyPani.length) !== 0 || getMyPani.length !== NaN) {
                // je recupére tout les panier en fonction de l'user connecter via le mail en session
                const renderMyPani = await Article.findAll({
                    include: {
                        model: Userslockerpanier,
                        as: "panier",
                        required: true,
                        where: {
                            user_id: `${req.session.user[0].id}`,
                        },
                    },
                });

                // je compte le nombre du panier via la longeur de ma table en bdd
                const nombreArticlePani = Number(renderMyPani.length);
                // console.log('nombreArticlePani', nombreArticlePani)

                return res.render("panier", {
                    renderMyPani,
                    nombreArticlePani,
                    title: "Mon Panier",
                });
            } else {
                console.log("Vous n'avez pas d'article dans votre panier");
                return res.redirect("/");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    addPaniPage: async (req, res, next) => {
        try {
            // je récupère l'id de mon url et l'user mail de connection
            const urlArticleId = parseInt(req.params.id, 10);
            const userEmail = req.session.user;
            // console.log(`your email: ${userEmail[0].email}`)

            if (Number.isNaN(urlArticleId)) {
                next();
            }

            // je recupére tout les panier en fonction de l'user connecter via le mail en session
            const gestMyPaniID = await Userslockerpanier.findAll({
                attributes: ["article_id"],
                where: {
                    user_id: userEmail[0].id,
                },
            });

            // je crée un tableau vide et je push les id en fonction de l'email de l'user
            const emailArticleList = [];

            for (const MyPani of gestMyPaniID) {
                emailArticleList.push(MyPani.article_id);
            }

            // console.log('gestMyPaniID', gestMyPaniID);-
            // je passe la longeur de ma table en NUMBER pour la comparer a "0" et comparer si mon tableau n'est pas un NaN
            if (Number(gestMyPaniID.length) > 0 || gestMyPaniID.length !== NaN) {
                // je verifie si l'id de l'url est inclu dans mon tableau
                if (emailArticleList.includes(urlArticleId)) {
                    console.log("Already ADD!");
                    res.redirect('back');
                } else {
                    await Userslockerpanier.create({
                        user_id: userEmail[0].id,
                        article_id: urlArticleId,
                    });

                    console.log("Success ADD!");
                    return res.redirect('back');
                }
            } else {
                // si les conditions sur premier IF ne sont pas remplis cela veux dire que
                //je n'est rien en panier, je crée un push en bdd avec l'email de l'user et l'id de l'article
                await Userslockerpanier.create({
                    user_id: userEmail[0].id,
                    article_id: urlArticleId,
                });

                // await sequelize.query(`DELETE FROM userslockerpanier t1
                // USING userslockerpanier t2
                // WHERE t1.user_email = t2.user_email
                // AND t1.article_id = t2.article_id
                // AND t1.id > t2.id;`);

                console.log("Ajout reussi");
                return res.redirect('back');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    paniDeleteArticle: async (req, res) => {
        try {
            // Je recupére l'id de l'url et je supprime "1" élément de mon tableau
            // en fonction de l'index (l'index correspond a l'id de mon url)
            const panierIndex = parseInt(req.params.id, 10);
            // console.log('panierindex', panierIndex);

            await Userslockerpanier.destroy({
                where: {
                    user_id: req.session.user[0].id,
                    article_id: panierIndex,
                },
            });
            // console.log(deleteid)

            return res.redirect("/panier");
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    error404(req, res) {
        res.status(404).render("error404", {
            url: req.url,
        });
    },
};

module.exports = favPaniController;