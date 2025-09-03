const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: { type: String },
    bio: { type: String, match: /[a-z]/ },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user'
    },
    password: { type: String },
    email: { type: String }
},{
    timestamps : true
});

module.exports = mongoose.model('blogUsers', UserModel);