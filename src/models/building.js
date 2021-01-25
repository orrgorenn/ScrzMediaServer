const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    monthly_payment: {
        type: Number,
        trim: true,
        required: true
    },
    image: { type: String },
    title: {
        type: String,
        required: true
    },
    city_code: {
        type: Number,
        trim: true,
        required: true,
        default: 293397
    },
    last_updated_ip: { type: String },
    status: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },
    master: {
        type: String,
        trim: true
    },
    rss: {
        type: String,
        required: true
    },
    fullscreen: {
        type: Number,
        enum: [0, 1],
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Building', buildingSchema);