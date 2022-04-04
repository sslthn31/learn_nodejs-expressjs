const produk = require('../models/produk')
exports.createProduk = (req, res, next) => {
    const judul = req.body.judul;
    const isinya = req.body.isinya;
    
    const posting = new produk({
        judul: judul,
        isinya: isinya
    });

    posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Post Success",
            data: result
        });        
    })
    .catch(err => {console.log('err:', err)});
}

exports.getAllProduk = (req, res, next) => {

    produk.find()
    .then(result => {
        res.status(200).json({
            message: "Data Sukses Dipanggil",
            data: result
        });
    })
    .catch(err => {
        next(err)
    })
}