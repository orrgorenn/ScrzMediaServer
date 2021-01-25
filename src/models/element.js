const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    bid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    elementSource: {
        type: String,
        required: true
    },
    elementType: {
        type: String,
        enum: ['text', 'image', 'video'],
        required: true
    },
    transitionTime: {
        type: Number,
        min: 5,
        required: true,
        default: 15
    }
}, { timestamps: true });

module.exports = mongoose.model('Element', elementSchema);