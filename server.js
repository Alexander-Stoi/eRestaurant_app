const express = require('express');
const router = require('./router.const');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(router);

app.listen(PORT, HOST, () => {
    console.log('Server is listening at http://localhost:3000');
})