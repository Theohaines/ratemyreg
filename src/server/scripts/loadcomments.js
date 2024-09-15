const path = require('path');
const sqlite3 = require('sqlite3');

async function loadComments(amnt, srchtype) {
    let comments = await new Promise((resolve, reject) => {
        let db = new sqlite3.Database(path.resolve('rmr.sqlite'));

        db.all('SELECT * FROM COMMENTS ORDER BY C_ID DESC LIMIT ?', [amnt], (err, rows) => {
            if (err){
                console.error(err);
                reject(err);
            }

            resolve(rows);
        })
    });

    return comments;
}

module.exports = { loadComments }