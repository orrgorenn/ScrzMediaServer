const express = require('express');
const { getUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/users');
const { authUser } = require('../utils/auth');
const { validateCreateUser, isReqValid } = require('../validators/user');

const router = express.Router();

router.get('/', authUser, getUsers);
router.post('/', validateCreateUser, isReqValid, createUser);
router.get('/:id', authUser, getUser);
router.put('/:id', authUser, editUser);
router.delete('/:id', authUser, deleteUser);

module.exports = router;