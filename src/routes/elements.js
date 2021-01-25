const express = require('express');
const { getElements, createElement, editElement, deleteElement } = require('../controllers/elements');
//const { authUser } = require('../utils/auth');
//const { validateCreateUser, isReqValid } = require('../validators/user');

const router = express.Router();

router.get('/:id', getElements);
router.post('/:id', createElement);
router.put('/:bi/:eid', editElement);
router.delete('/:bi/:eid', deleteElement);

module.exports = router;