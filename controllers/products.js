const product = require('../model/products');

//adding products 
exports.postAddProducts = (req, res, next) => {
    const productName = req.body.ProductName;
    const productType = req.body.productType;
    const price = req.body.price;

    console.log(productName, productType, price);

    product.create({
        ProductName: productName,
        ProductType: productType,
        price: price
    }).then(result => {
        console.log('product added');
        res.json({ message: "product added succesfully" });
    }).catch(err => {
        console.log(err);
    });
}
//fetching all the products 
exports.getProducts = (req, res, next) => {
    const start = req.params.start;
    console.log(start);
    const pageSize = 3;
    product.findAll({
        offset: 0,
        limit: 10
    })
        .then(products => {
            res.json({ product: products })
        });
}

//updating products
exports.posteditproduct = (req, res, next) => {
    const ProductName = req.body.ProductName;
    const ProductType = req.body.ProductType;
    const price = req.body.price;
    const id = req.params.id;
    console.log(id)
    product.findByPk(id)
        .then(product => {
            product.ProductName = ProductName;
            product.ProductType = ProductType;
            product.price = price;
            return product.save();
        })
        .then(resutl => {
            console.log('product updated '); // send json res for success
        })
}
exports.postDelProduct = (req, res, next) => {
    const id = req.params.id;
    product.destroy({
        where: { id: id }
    }).then(result => {
        console.log("product deleted");
        res.json({ msg: "prodcut deleted" })
    }).catch(err => {
        console.log(err);
    })
}
exports.searchProductdetails = (req, res, next) => {
    const ProductName = req.params.ProductName;
    console.log(ProductName);
    product.findAll({ where: { ProductName: ProductName } })
        .then(result => {
            res.json({ user: result })
        })
        .catch(err => {
            console.log(err);
        })
}
