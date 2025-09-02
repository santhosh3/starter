const bcrypt = require('bcryptjs');
const z = require('zod');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/index');

 const registerSchema = z.object({
            name: z.string(),
            password: z.string().min(8),
            bio: z.string(),
            email: z.email(),
});

  const loginSchema = z.object({
            password: z.string(),
            email: z.email(),
 });

function Validation(data, schema) {
    try {
        const result = schema.safeParse(data);
        if (!result.success) {
            return {
                error: true,
                data: JSON.parse(result.error).reduce((obj,value) => {
                   obj[value.path.join(',')] = value.message;
                   return obj
                },{})
            }
        } else {
            return {
                error: false,
                data: result.data
            }
        }
    } catch (error) {
        return {
            error: true,
            data: JSON.parse(error.message).reduce((obj,value) => {
                   obj[value.path.join(',')] = value.message;
                   return obj
                },{})
        }
    }
}


async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function decodePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword)
}

function createJWT(payload) {
    return jwt.sign(payload, JWTSECRET, { expiresIn: '2h' });
}

function decodeToken(token) {
    return jwt.verify(token, JWTSECRET);
}

module.exports = {
    hashPassword,
    Validation,
    decodePassword,
    createJWT,
    decodeToken,
    registerSchema,
    loginSchema
}
