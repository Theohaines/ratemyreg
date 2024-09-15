const path = require('path');
const sqlite3 = require('sqlite3');

const messages = require('../json/messages.json');

const numberPlateRegex = /(^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3}$)/

async function validateReg(reg){
    let validated = await new Promise((resolve, reject) => {
        if (numberPlateRegex.test(reg)) {
            resolve(true);
        } else {
            resolve(false);
        }
    })

    return validated;
}

async function messageDecoder(type, index) {
    let message = await new Promise((resolve, reject) => {
        if (type == "E"){
            resolve(messages.ERRORS[index]);
        } else if (type == "W") {

        } else if (type == "I") {

        } else {
            resolve("500 Internal server error. The internal server message system has failed please try again later.");
        }
    })

    return message;
}

module.exports = {validateReg, messageDecoder}