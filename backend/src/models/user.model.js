const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: { type: String },
    bio: { type: String, match: /[a-z]/ },
    password: { type: String },
    email: { type: String }
},{
    timestamps : true
});

module.exports = mongoose.model('blogUsers', UserModel);