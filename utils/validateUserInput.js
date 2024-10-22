const ERR = require("./errorMessages.js")

const validateUserInput = (id, name) => {
    if(!id && name === null) {
        throw Error(ERR.ID_REQUIRED)
    }
    if(!id) {
        throw Error(ERR.ID_REQUIRED)
    }
    if(!name) {
        throw Error(ERR.NAME_REQUIRED)
    }
}

module.exports = { 
    validateUserInput 
}