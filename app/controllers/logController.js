require("dotenv").config();

const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");

const Users = require("../models/Users");

const logController = {
  /*-----------------------|---------------|-------------------------*/
  /*                       | LOGIN SECTION |                        */
  /*-----------------------|---------------|-----------------------*/

  showLoginPage(_, res) {
    return res.render("login");
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // recuperation de l'email de connection de l'user
      const user = await Users.findAll({
        where: {
          email: email,
        },
      });

      const getUsers = await Users.findAll({
        attributes: ["email"],
      });
      // je cree un tableau et je push les user.emil recuperer
      const emailUserList = [];

      for (const getUser of getUsers) {
        emailUserList.push(getUser.email);
      }

      // si les condition du form ne sont pas remplis je render une erreur sur le formulaire
      if (email === "" || password === "") {
        // || req.body.passwordConfirm === ""

        return res.render("login", {
          error1: "Merci de remplir les champs obligatoires *",
        });
      }

      if (emailUserList.includes(email)) {
        // je compare le code entré dans le from avec celui hashed
        const validPass = bcrypt.compareSync(password, user[0].password);

        // si le mdp hashde est different du mdp de confirmation alors je render error
        if (validPass) {
          req.session.user = user;

          return res.redirect("/");
        } else {
          return res.render("login", {
            error3: "identifiant ou mot de passe erroné",
          });
        }
      } else {
        return res.render("login", {
          error3: "identifiant ou mot de passe erroné ",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  logout(req, res) {
    // destroy session ( rien d'important n'est stocké )
    req.session.destroy();
    return res.redirect("/");
  },

  error404(req, res) {
    res.status(404).render("error404", {
      url: req.url,
    });
  },

  /*-----------------------|---------------|-------------------------*/
  /*                       |    REGISTER   |                        */
  /*-----------------------|---------------|-----------------------*/

  showRegisterPage(_, res) {
    return res.render("register");
  },

  async registerUser(req, res) {
    try {
      const {
        email,
        password,
        passwordConfirm,
        name,
        prenom,
        pays,
        ville,
        adresse,
      } = req.body;

      // console.log('req.body.email', req.body.email);
      // je récupére l'email de l'user
      const getUsers = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (password === "") {
        return res.render("register", {
          error1: "Veillez remplir les champs obligatoires",
        });
      }

      if (!emailValidator.validate(req.body.email)) {
        return res.render("register", {
          error3: "Email non disponible",
        });
      } else {
        if (password !== passwordConfirm) {
          return res.render("register", {
            error2: "Les mots de passe ne correspondent pas",
          });
        } else {
          // je hash le password a l'inscription du from
          const hashedPass = bcrypt.hashSync(password, 10);

          // j'insert dans la bdd les infos du form + le password hashed
          await Users.create({
            email,
            password: hashedPass,
            name,
            prenom,
            pays,
            ville,
            adresse,
          });

          // je recupére l'email de l'user
          const user = await Users.findAll({
            where: {
              email: email,
            },
          });
          req.session.user = user;
          delete user[0].password;

          return res.redirect("/profil");
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};
module.exports = logController;
