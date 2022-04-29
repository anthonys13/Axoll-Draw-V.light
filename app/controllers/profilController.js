require("dotenv").config();

const bcrypt = require("bcryptjs");

const {
  Article,
  Userslockerpanier,
  Userslockerfavoris,
  Users,
} = require("../models/index.js");

const profilController = {
  async profilPage(req, res) {
    try {
      // j'affiche les infos de l'user dans la page a partir de son email de connection
      const renderMyProfil = await Users.findAll({
        where: {
          email: req.session.user[0].email,
        },
      });
      // console.log('test',renderMyProfil[0].email);

      // je fait une jointure pour savoir quel utilisateur appartiens chaque favoris ou panier et les renvois a la views
      const renderMyPani = await Article.findAll({
        include: {
          model: Userslockerpanier,
          as: "panier",
          required: true,
          where: {
            user_id: `${renderMyProfil[0].id}`,
          },
        },
      });
      // console.log('pani', renderMyPani[0]);

      const renderMyFavs = await Article.findAll({
        include: {
          model: Userslockerfavoris,
          as: "favoris",
          required: true,
          where: {
            user_id: `${renderMyProfil[0].id}`,
          },
        },
      });
      // console.log('favs', renderMyFavs[0]);

      return res.render("profil", {
        renderMyProfil,
        renderMyPani,
        renderMyFavs,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  //je render uniquement ma views pour changer mes infos
  InfoPage(_, res) {
    return res.render("editemail");
  },

  //je render uniquement ma views pour changer l'adresse
  AdressePage(_, res) {
    return res.render("editadresse");
  },

  //je render uniquement ma views pour changer le mot de passe
  passPage(_, res) {
    return res.render("editpass");
  },

  async editEmailPage(req, res) {
    try {
      const getUsers = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (req.body.email === "") {
        return res.render("editemail", {
          error1: "Merci de remplir les champs obligatoires *",
        });
      }

      if (getUsers || req.body.email === req.session.user[0].email) {
        return res.render("editemail", {
          error3: "Email non disponible",
        });
      } else {
        // sinon je recupére les user en fonction de l'email de session
        const getUsers = await Users.findAll({
          where: {
            email: req.session.user[0].email,
          },
        });

        await Users.update(
          {
            row: true,
            email: req.body.email,
          },
          {
            where: {
              email: getUsers[0].email,
            },
          }
        );

        const user = await Users.findAll({
          where: {
            email: req.body.email,
          },
        });
        req.session.user = user;
        delete user[0].password;

        return res.redirect("/profil");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async editPassPage(req, res) {
    try {
      const {
        // passwordActuel,
        password,
        passwordConfirm,
      } = req.body;

      if (req.body.password === "" || req.body.passwordConfirm === "") {
        res.render("editpass", {
          error1: "Veillez remplir les champs obligatoires",
        });
      } else {
        // je hash le champ du password que je vais push en bdd
        const hashedPass1 = await bcrypt.hash(password, 10);

        // je compare mon champ password et passwordConfirm du form avec le password hashed
        const validPass = await bcrypt.compare(password, hashedPass1);
        const validPass2 = await bcrypt.compare(passwordConfirm, hashedPass1);

        // si match alors je push sinon je render error
        if (validPass !== validPass2) {
          res.render("editpass", {
            error1: "Les mots de passe ne correspondent pas",
          });
        } else {
          await Users.update(
            {
              row: true,
              password: hashedPass1,
            },
            {
              where: {
                email: req.session.user[0].email,
              },
            }
          );

          const user = await Users.findAll({
            where: {
              email: req.session.user[0].email,
            },
          });
          req.session.user = user;
          delete req.session.user[0].password;

          return res.redirect("/profil");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async editAdressePage(req, res) {
    try {
      const getUsers = await Users.findAll({
        attributes: ["email"],
      });
      // je cree un tableau et je push les user.emil recuperer
      const emailUserList = [];

      for (const getUser of getUsers) {
        emailUserList.push(getUser.email);
      }

      // si les condition du form ne sont pas remplis je render une erreur sur le formulaire
      if (
        req.body.prenom === "" ||
        req.body.name === "" ||
        req.body.pays === "" ||
        req.body.ville === "" ||
        req.body.adresse === ""
      ) {
        res.render("editadresse", {
          error: "Merci de remplir les champs obligatoires *",
        });
      } else {
        // sinon je recupére les user en fonction de l'email de session
        const getUsers = await Users.findAll({
          where: {
            email: req.session.user[0].email,
          },
        });

        // console.log('getUsers[0].email', getUsers[0].email);

        // je update les champs en bdd via le form
        await Users.update(
          {
            row: true,
            prenom: req.body.prenom,
            name: req.body.name,
            pays: req.body.pays,
            ville: req.body.ville,
            adresse: req.body.adresse,
          },
          {
            where: {
              email: getUsers[0].email,
            },
          }
        );

        // console.log('getUsers.email', getUsers.email);

        // je recupére le novueau email du form pour l'ajouter en session et rester log
        const user = await Users.findAll({
          where: {
            email: getUsers[0].email,
          },
        });
        req.session.user = user;
        delete user[0].password;

        return res.redirect("/profil");
      }
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

module.exports = profilController;
