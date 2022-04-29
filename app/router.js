require('dotenv').config();
const express = require('express');
const router = express.Router();

const adminController = require('./controllers/adminController');
const logController = require('./controllers/logController');
const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const favPaniController = require('./controllers/favPaniController');
const profilController = require('./controllers/profilController');

const adminChecker = require('./middlewares/adminChecker');

/**************************ADMIN************************/

router.get('/admin', adminChecker, adminController.showAdminPage);

router.get('/admin/article', adminChecker, adminController.showArticlePage);
router.post('/admin/add', adminChecker, adminController.addArticle);

/**************************REGISTER************************/

router.get('/register', logController.showRegisterPage);
router.post('/register', logController.registerUser);

/**************************LOGIN************************/

router.get('/login', logController.showLoginPage);
router.post('/login', logController.login);

router.get('/logout', logController.logout);

/**************************ACCUEIL************************/

router.get('/', mainController.homePage);

router.get('/article/:id', mainController.articlePage);

/**************************RECHERCHE************************/

router.get('/search/article', searchController.searchArticle);

/**************************FAVORIS************************/

router.get('/favoris', adminChecker, favPaniController.favPage);

router.get('/favoris/add/:id', adminChecker, favPaniController.addFavPage);

router.get('/favoris/delete/:id', adminChecker, favPaniController.favDeleteArticle);

/**************************PANIER************************/

router.get('/panier', adminChecker, favPaniController.panierPage);

router.get('/panier/add/:id', adminChecker, favPaniController.addPaniPage);

router.get('/panier/delete/:id', adminChecker, favPaniController.paniDeleteArticle);

/**************************PROFIL************************/

router.get('/profil', adminChecker, profilController.profilPage);

router.get('/edit/email', adminChecker, profilController.InfoPage);
router.post('/edit/email', adminChecker, profilController.editEmailPage);

router.get('/edit/pass', adminChecker, profilController.passPage);
router.post('/edit/pass', adminChecker, profilController.editPassPage);

router.get('/edit/adresse', adminChecker, profilController.AdressePage);
router.post('/edit/adresse', adminChecker, profilController.editAdressePage);

// Genere la page 404
router.use(mainController.error404);

module.exports = router;