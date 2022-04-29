require('dotenv').config();

const express = require('express');
const session = require('express-session');
const router = require('./app/router');
const initLocals = require('./app/middlewares/initLocals');

const app = express();

const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_PASS || 'password par fort',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 *60 *24)
      }
}));

app.use(initLocals);

app.use(express.urlencoded({
    extended: true
}));

app.use(router);

app.listen(port, () => {
    console.log(`Server launched ${port}`);
});