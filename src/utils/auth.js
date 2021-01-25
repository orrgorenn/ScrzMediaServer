const jwt = require('jsonwebtoken');

exports.authUser = (req, res, next) => {
    if(!req.headers.authorization) return res.status(500).json({ message: 'Unauthorized.' });
    const token = req.headers.authorization.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch(err) {
        return res.status(400).json({ message: err });
    }
}