 require('dotenv').config();

module.exports = {
    DB : process.env.MONGO_DB,
    JWTSECRET : process.env.JWT_SECRET
}

