const express = require('express');
const router = express.Router();

const createProductsController = require('../controllers/produk')

//create -> post localhost:4000/v1/product
router.post('/product', createProductsController.createProduk);

//read -> get -- localhost:4000/v1/products
router.get('/productnya', createProductsController.getAllProduk);

/* router.delete('/products', (req, res, next) => {
    res.json({
        id: "3112",
        name: "sento",
    });
    next();
});

router.put('/products', (req, res, next) => {
    res.json({
        id: "3112",
        name: "sento",
    });
    next();
}); */

module.exports = router;