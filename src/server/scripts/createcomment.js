const path = require('path');
const sqlite3 = require('sqlite3');
const toolbox = require('./toolbox.js');

async function createComment(reg, title, body) {
    let regValidated = await toolbox.validateReg(reg);
    if (!regValidated) {
        return ["err", 400, await toolbox.messageDecoder("E", 0)];
    }

    if (title.length < 3){
        return ["err", 400, await toolbox.messageDecoder("E", 1)];
    }

    if (title.length > 30){
        return ["err", 400, await toolbox.messageDecoder("E", 2)];
    }

    if (body.length < 30){
        return ["err", 400, await toolbox.messageDecoder("E", 3)];
    }

    if (body.length > 260){
        return ["err", 400, await toolbox.messageDecoder("E", 4)];
    }

    var commentPublished = await addCommentToDB(reg, title, body);

    if (!commentPublished){
        return ["err", 400, await toolbox.messageDecoder("E", 5)];
    }

    return ["okay", 200];
}

async function addCommentToDB(reg, title, body) {
    var db = new sqlite3.Database(path.resolve('rmr.sqlite'));

    var commentPublished = await new Promise((resolve, reject) => {
        db.run("INSERT INTO COMMENTS (C_REG, C_TITLE, C_BODY) VALUES(?,?,?)", [reg, title, body], (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            resolve(true);
        })
    })

    db.close();
    return commentPublished;
}

module.exports = {createComment}