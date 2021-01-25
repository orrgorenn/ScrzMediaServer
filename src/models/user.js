const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hash_pwd: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        trim: true,
        required: true,
        min: 10000,
        max: 9999999
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['New', 'Closed', 'Not Interested', 'Archive'],
        required: true,
        default: 'New'
    },
    role: {
        type: String,
        enum: ['user', 'rep', 'admin'],
        required: true,
        default: 'user'
    },
    rep_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rep'
    }
}, { timestamps: true });

userSchema.virtual('password').set(function (password) {
    this.hash_pwd = bcrypt.hashSync(password, 10);
});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compare(password, this.hash_pwd);
    }
}

module.exports = mongoose.model('User', userSchema);
