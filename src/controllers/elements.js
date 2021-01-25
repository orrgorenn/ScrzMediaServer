const Element = require('../models/element');

exports.getElements = (req, res) => {
    Element.find({ bid: req.params.id })
        .then(elements => res.status(200).json( elements ))
        .catch(err => res.status(400).json({ message: 'Incorrect BID.' }));
}

exports.createElement = (req, res) => {
    const { elementSource, elementType, transitionTime } = req.body;
    const bid = req.params.id;
    
    const _element = new Element({ bid, elementSource, elementType, transitionTime });

    _element.save((err, element) => {
        if(err) return res.status(400).json({ message: 'Error while creating element.' });
        if(element) return res.status(201).json({ message: 'Element Created.' });
    });
}

exports.editElement = (req, res) => {
    const eid = req.params.eid;
    const bid = req.params.bid;

    Element.findOne({ bid: bid, _id: eid }).exec(async (err, element) => {
        if(err) return res.status(400).json({ message: 'Element not found.' });

        if(element) {
            Element.update({ _id: eid }, req.body).exec((err, user) => {
                if(err || !user) return res.status(400).json({ message: 'Error during updating element.' });

                return res.status(200).json({ message: 'Element updated successfully.' });
            });
        } else {
            return res.status(400).json({ message: 'Element not found.' });
        }
    });
}

exports.deleteElement = (req, res) => {
    const eid = req.params.eid;
    const bid = req.params.bid;

    Element.findOne({ bid: bid, _id: eid }).exec(async (err, element) => {
        if(err) return res.status(400).json({ message: 'Element not found.' });

        if(element) {
            Element.remove({ _id: eid }).exec((err, element) => {
                if(err) return res.status(400).json({ message: 'No such element.' });
        
                return res.status(200).json({ message: 'Element deleted successfully.' });
            });
        } else {
            return res.status(400).json({ message: 'Element not found.' });
        }
    });
}