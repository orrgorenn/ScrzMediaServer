const express = require('express');
const { getBuildings, getBuilding, createBuilding, editBuilding, deleteBuilding } = require('../controllers/buildings');
const { authUser } = require('../utils/auth');
const { validateCreateBuilding, isReqValid } = require('../validators/building');

const router = express.Router();

router.get('/', getBuildings);
router.post('/', validateCreateBuilding, isReqValid, createBuilding);
router.get('/:id', authUser, getBuilding);
router.put('/:id', authUser, editBuilding);
router.delete('/:id', authUser, deleteBuilding);

module.exports = router;