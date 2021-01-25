const User = require('../models/user');

exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json( users ))
        .catch(err => res.status(400).json({ message: err }));
}

exports.getUser = (req, res) => {
    User.find({ _id: req.params.id }).exec((err, user) => {
        if(err) return res.status(400).json({ message: 'No such user.' });

        return res.status(200).json({ user });
    });
}

exports.createUser = (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if(err || user) return res.status(400).json({ message: 'User already registered.' });

        const { firstName, lastName, username, password, email, address1, address2, city, zipcode, phone, status, role, rep_id } = req.body;
        const _user = new User({ firstName, lastName, username, password, email, address1, address2, city, zipcode, phone, status, role, rep_id });

        _user.save((err, user) => {
            if(err) return res.status(400).json({ message: 'Error while creating user.' });
            if(user) return res.status(201).json({ message: 'User Created.' });
        });
    });
}

exports.editUser = (req, res) => {
    User.update({ _id: req.params.id }, req.body).exec((err, user) => {
        if(err || !user) return res.status(400).json({ message: 'Error during updating user.' });

        return res.status(200).json({ message: 'User updated successfully.' });
    });
}

exports.deleteUser = (req, res) => {
    User.remove({ _id: req.params.id }).exec((err, user) => {
        if(err) return res.status(400).json({ message: 'No such user.' });

        return res.status(200).json({ message: 'User deleted successfully.' });
    });
}