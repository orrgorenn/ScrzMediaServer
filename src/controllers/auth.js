const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }).exec(async (err, user) => {
        if (err) return res.status(400).json({ message: 'No username with this username.' });

        if (user) {
            user.authenticate(req.body.password).then((result) => {
                if(result) {
                    // User & Password are correct
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({ token, user: { _id, firstName, lastName, email, role, fullName } });
                } else {
                    return res.status(400).json({ message: 'Password is incorrect.' });
                }
            });
        } else return res.status(400).json({ message: 'Something went wrong.' });
    });
}