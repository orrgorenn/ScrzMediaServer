const { check, validationResult } = require('express-validator');

exports.validateCreateBuilding = [
    check('uid').notEmpty().withMessage('UID is empty.'),
    check('monthly_payment').notEmpty().withMessage('Monthly Payment is empty.'),
    check('title').isLength({ min: 5 }).withMessage('Title must be minimum 5 characters long.'),
    check('title').isLength({ max: 40 }).withMessage('Title must be maximum 40 characters long.'),
    check('rss').notEmpty().withMessage('RSS Url is empty.')
];

exports.isReqValid = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};