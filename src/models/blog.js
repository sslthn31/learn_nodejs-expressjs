const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogPost = new schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author:{
        type: Object,
        require: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogPost', blogPost);