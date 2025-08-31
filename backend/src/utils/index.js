const bcrypt = require('bcryptjs');
const z = require('zod');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/index');

function registerUserValidation(data) {
    try {
        const userSchema = z.object({
            name: z.string(),
            password: z.string(),
            bio: z.string(),
            email: z.email(),
        });
        const result = userSchema.safeParse(data);
        if (!result.success) {
            return {
                error: true,
                data: result.error
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
            data: error.message
        }
    }
}

function loginUserValidation(data) {
    try {
        const userSchema = z.object({
            password: z.string(),
            email: z.email(),
        });
        const result = userSchema.safeParse(data);
        if (!result.success) {
            return {
                error: true,
                data: result.error
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
            data: error.message
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

module.exports = {
    hashPassword,
    registerUserValidation,
    loginUserValidation,
    decodePassword,
    createJWT
}
