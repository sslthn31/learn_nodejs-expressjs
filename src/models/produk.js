const mongoose = require('mongoose');
const schema = mongoose.Schema;

const produk = new schema({
    judul: {
        type: String,
        required: true,
    },
    isinya: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('produk', produk);