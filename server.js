const express = require('express');
const router = require('./router.const');
const session = require('./session.const');
const helmet = require('helmet');

const app = express();
app.use(helmet());


app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({
    action: 'deny',
}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "font-src": "https://fonts.googleapis.com/",
        "frame-ancestors": "none",
        "img-src": "example.com/images",
        "script-src": 'self'
    },
}));
app.use(helmet.dnsPrefetchControl({
    allow: false,
}));
app.use(helmet.xssFilter());

app.use(router);


app.listen(PORT, HOST, () => {
    console.log('Server is listening at http://localhost:3000');
})