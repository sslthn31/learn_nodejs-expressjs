const express = require('express');
const router = express.Router();

const createProductsController = require('../controllers/products')

//create -> post localhost:4000/v1/product
router.post('/product', createProductsController.createProducts);

//read -> get -- localhost:4000/v1/products
router.get('/products', createProductsController.getAllProducts);

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