const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogModel = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'blogUsers',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [String],
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    category: {
        type : String,
        required : true
    },
    isPublished: {
        type : Boolean,
        default : false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('blog', BlogModel);