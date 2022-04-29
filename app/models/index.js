const Article = require("./Article");
const Userslockerpanier = require("./Userslockerpanier");
const Userslockerfavoris = require("./Userslockerfavoris");
const Users = require("./Users");
const Historiquevente = require("./Historiquevente");
const Affiche = require("./Affiche");

// 0,n
Userslockerpanier.hasMany(Article, {
  foreignKey: "id",
  as: "article",
});

// 0,1
Article.hasOne(Userslockerpanier, {
  foreignKey: "article_id",
  as: "panier",
});

Userslockerfavoris.hasMany(Article, {
  foreignKey: "id",
  as: "article",
});

Article.hasOne(Userslockerfavoris, {
  foreignKey: "article_id",
  as: "favoris",
});

Userslockerpanier.hasMany(Users, {
  foreignKey: "id",
  as: "logUserPani",
});

Users.hasOne(Userslockerpanier, {
  foreignKey: "user_id",
  as: "logPani",
});

Userslockerfavoris.hasMany(Users, {
  foreignKey: "id",
  as: "logUserFavs",
});

Users.hasOne(Userslockerfavoris, {
  foreignKey: "user_id",
  as: "logFavs",
});

Historiquevente.hasMany(Article, {
  foreignKey: "id",
  as: "histoArticle",
});

Article.hasOne(Historiquevente, {
  foreignKey: "article_id",
  as: "histoArticle",
});

Historiquevente.hasMany(Users, {
  foreignKey: "id",
  as: "histoUser",
});

Users.hasOne(Historiquevente, {
  foreignKey: "user_id",
  as: "histoUser",
});

module.exports = {
  Article,
  Userslockerpanier,
  Userslockerfavoris,
  Users,
  Historiquevente,
  Affiche,
};
