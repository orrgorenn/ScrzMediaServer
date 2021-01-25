const express = require('express');
const { login } = require('../controllers/auth');
const { validateLogin, isReqValid } = require('../validators/auth');

const router = express.Router();

router.post('/login', validateLogin, isReqValid, login);

module.exports = router;
