const userModel = require('../models/user.model');
const { decodeToken } = require('../utils');

async function AuntenticateUser(reqest, response, next) {
   try {
    let token = reqest.headers.authorization;
    if(!token) {
        return response.status(400).send({error : true, message : "token not found"})
    }
    token = token.split(" ")[1]
    const userId = decodeToken(token);
    if(!userId) {
        return response.status(401).send({error : true, message : "unAuthorized Access"})
    }
    const user = await userModel.findById(userId.id).select("role");
    reqest.user = user;   // {"_id" : "wer", "role" : "user"}
    next()
   } catch (error) {
      if(error.message === "jwt expired") {
        return response.status(400).send({error : true, message : "Token Expires"})
      }
      return response.status(500).send({error : true, message : error.message})
   }
}

module.exports = {
    AuntenticateUser
}