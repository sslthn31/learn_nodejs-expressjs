exports.createProducts = (req, res, next) => {
    //console.log('Request :', req.body)
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message: "create product success!!!",
        data: {
            id: 1,
            name: name,
            price: price
        }
    });
    next();
};
exports.getAllProducts = (req, res, next) => {
    res.json(
        {
        message: "get all success",
        data: [
            {
                id: 1,
                name: "bread",
                price: 15000
            }
        ]
    }
    );
    next();
};