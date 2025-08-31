const express = require('express');
const { register } = require('../controllers/user.controller');

const router = express.Router();

router.post('/users', register);

module.exports = router;