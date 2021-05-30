const session = require('express-session');

module.exports = session({
    secret: ['test'],
    cookie: {
        maxAge: 5 * 60 * 60,
    },
    saveUninitialized: true,
    resave: false
});