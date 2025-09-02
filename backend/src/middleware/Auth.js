const { decodeToken } = require('../utils');

async function AuntenticateUser(reqest, response, next) {
    let token = reqest.headers.authorization;
    if(!token) {
        return response.status(400).send({error : true, message : "token not found"})
    }
    token = token.split(" ")[1]
    const userId = decodeToken(token);
    if(!userId) {
        return response.status(401).send({error : true, message : "unAuthorized Access"})
    }
    reqest.userId = userId.id;
    next()
}

module.exports = {
    AuntenticateUser
}