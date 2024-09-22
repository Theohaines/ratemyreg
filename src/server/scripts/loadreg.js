const path = require('path');
const sqlite3 = require('sqlite3');
const toolbox = require('./toolbox.js');

async function loadReg(reg){
    let regValidated = await toolbox.validateReg(reg);
    if (!regValidated) {
        return ["err", 400, await toolbox.messageDecoder("E", 0)];
    }

    let comments = await loadComments(reg);

    if (!comments) {
        return ["ser", 500, await toolbox.messageDecoder("E", 5)];
    }

    return ["okay", 200, comments];
}

async function loadComments(reg) {
    let db = new sqlite3.Database(path.resolve('rmr.sqlite'));

    let comments = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM COMMENTS WHERE C_REG = ?", [reg], (err, rows) => {
            if (err) {
                console.error(err);
                reject(false);
            }

            resolve(rows);
        })
    });

    db.close();
    return comments;
}

module.exports = {loadReg}