const product = require('../model/product');

//adding products 
exports.postAddProducts = (req, res, next) => {
    const ProductName = req.body.ProductName;
    const ProductType = req.body.ProductType;
    const price = req.body.price;

    user.create({
        ProductName: ProductName,
        ProductType: ProductType,
        price: price,
    }).then(result => {
        console.log('usr added');
    }).catch(er => {
        console.log(err);
    });
}
//fetching all the products 
exports.getProducts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 3;
    sequelize.query('select count(*) over(), name from table where condition', { model: Model });
    product.findAll()
        .then(products => {
            res.json({ product: products });
        })
}
//updating products
exports.posteditproduct = (req, res, next) => {
    const ProductName = req.body.ProductName;
    const ProductType = req.ProductType;
    const price = req.body.price;
    const id = req.body.id;
    product.findById(id)
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
    const id = req.body.id;
    product.findById(id)
        .then(product => {
            return product.destroy();
        })
        .than(result => {
            console.log(" product deleted");//send json response for deletion
        })
        .catch(err => {
            console.log(err);
        })

}
exports.searchProductdetails = (req, res, next) => {
    const ProductName = req.body.ProductName;
    user.findAll({ where: { ProductName: ProductName } }).then(result => {
        res.json({ user: result })
    }).catch(err => {
        console.log(err);
    })
}