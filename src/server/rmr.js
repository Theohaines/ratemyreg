const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

//Resource routes
app.use('/', express.static(path.resolve('src/client')));
app.use('/styles', express.static(path.resolve('src/client/styles')));
app.use('/media', express.static(path.resolve('src/client/media')));
app.use('/scripts', express.static(path.resolve('src/client/scripts')));
app.use('/fonts', express.static(path.resolve('src/client/fonts')));

//Page routes

app.use('/landing', express.static(path.resolve('src/client/pages/landing')));

//GET pages

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/landing/index.html'));
})

//Listen and learn a schitzophrenic is talking

app.listen(process.env.PORT, () => {
    console.log('listening on', process.env.PORT);
})