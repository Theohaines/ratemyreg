const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Scripts
const toolbox = require('./scripts/toolbox.js');
const loadreg = require('./scripts/loadreg.js');
const createcomment = require('./scripts/createcomment.js');
const loadcomments = require('./scripts/loadcomments.js');

//Resource routes
app.use('/', express.static(path.resolve('src/client')));
app.use('/styles', express.static(path.resolve('src/client/styles')));
app.use('/media', express.static(path.resolve('src/client/media')));
app.use('/scripts', express.static(path.resolve('src/client/scripts')));
app.use('/fonts', express.static(path.resolve('src/client/fonts')));

//Page routes

app.use('/landing', express.static(path.resolve('src/client/pages/landing')));
app.use('/regview', express.static(path.resolve('src/client/pages/regview')));
app.use('/create', express.static(path.resolve('src/client/pages/create')));
//GET pages

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/landing/index.html'));
})

app.get('/regview', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/regview/index.html'));
})

app.get('/create', (req, res) => {
    res.status(200).sendFile(path.resolve('src/client/pages/create/index.html'));
})

//USE

app.use('/loadreg', async (req, res) => {
    var response = await loadreg.loadReg(req.body.reg);

    res.status(response[1]).json(JSON.stringify({"response" : response[0], "payload" : response[2]}));
})

app.use('/createcomment', async (req, res) => {
    var response = await createcomment.createComment(req.body.reg.toUpperCase(), req.body.title, req.body.body);

    res.status(response[1]).json(JSON.stringify({"response" : response[0], "payload" : response[2]}));
})

app.use('/validatereg', async (req, res) => {
    let response = await toolbox.validateReg(req.body.reg);
    if (response == false) {
        var message = await toolbox.messageDecoder("E", 0);
        res.status(400).json(JSON.stringify({"response" : "err", "payload" : message}));
        return;
    }

    res.status(200).json(JSON.stringify({"response" : "okay", "payload" : ""}));
})

app.use('/loadcomments', async (req, res) => {
    let comments = await loadcomments.loadComments(req.body.amnt, req.body.srchtype);

    res.status(200).send(JSON.stringify(comments));
})

//Handle status
app.get('*', (req, res) => { //404
    res.status(404).sendFile(path.resolve('src/client/pages/status/404/index.html'));
});

//Listen and learn a schitzophrenic is talking

app.listen(process.env.PORT, () => {
    console.log('listening on', process.env.PORT);
})