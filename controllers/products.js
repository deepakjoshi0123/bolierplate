const product = require('../model/products');

//adding products 
class productController {
    static postAddProducts = (req, res, next) => {
        logger.info('going in postaddproducts');
        const productName = req.body.ProductName;
        const productType = req.body.productType;
        const price = req.body.price;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            const error = new Error('validation fail ');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

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
    static getProducts = (req, res, next) => {
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
    static posteditproduct = (req, res, next) => {
        const ProductName = req.body.ProductName;
        const ProductType = req.body.ProductType;
        const price = req.body.price;
        const id = req.params.id;

        if (!errors.isEmpty()) {
            console.log(errors)
            const error = new Error('validation fail ');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

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
    static postDelProduct = (req, res, next) => {
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
    static searchProductdetails = (req, res, next) => {
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
}
module.exports = productController;
