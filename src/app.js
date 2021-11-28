const { urlencoded } = require('express');
const express = require('express');
const usersRouter = require('./routes/users');
// const emailRouter = require('./routes/verificationEmail');

module.exports = () => {
    const app = express();

    app.set('view-engine', 'ejs');

    app.use(express.json());
    // NEED TO UNDERSTAND WHAT THIS DOES!!!!!!!!!!!!
    app.use(express.urlencoded({ extended: false }));

    // make the app use different routes
    app.use(usersRouter);
    // app.use(emailRouter);

    app.get('/', (req, res) => {
        res.render('homepage.ejs');
    });

    app.get('/register', (req, res) => {
        res.render('register.ejs');
    });

    app.get('/login', (req, res) => {
        res.render('login.ejs');
    });

    return app;
};