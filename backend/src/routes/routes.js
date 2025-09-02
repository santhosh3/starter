const express = require('express');
const { register, profile } = require('../controllers/user.controller');
const { AuntenticateUser } = require('../middleware/Auth');

const router = express.Router();

router.post('/register', register);
router.get('/profile', AuntenticateUser, profile) // route level middleware

module.exports = router;