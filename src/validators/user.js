const { check, validationResult } = require('express-validator');

exports.validateCreateUser = [
    check('firstName').notEmpty().withMessage('First name is empty.'),
    check('lastName').notEmpty().withMessage('Last name is empty.'),
    check('username').isLength({ min: 5 }).withMessage('Username must be atleast 5 characters long.'),
    check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long.'),
    check('email').isEmail().withMessage('Please enter a valid email address.'),
    check('address1').notEmpty().withMessage('Address1 is empty.'),
    check('city').notEmpty().withMessage('City is empty.'),
    check('zipcode').notEmpty().withMessage('Zipcode is empty.'),
    check('phone').notEmpty().withMessage('Phone is empty.')
];

exports.isReqValid = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};