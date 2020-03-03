const product = require('../model/products');
//adding products 
class productController {
    static postAddProducts = async(req, res, next) => {
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
     try{
       const result = await product.create({
            ProductName: productName,
            ProductType: productType,
            price: price
        }) 

            console.log('product added')
            res.json({ message: "product added succesfully" });
           }
        catch(err ) {
            console.log(err);
        }
    }
    //fetching all the products 
    static getProducts = async(req, res, next) => {
        const start = req.params.start;
        const pageSize = 3;
       try{
        const products =await product.findAll({
            offset: 0,
            limit: 10
        })
                res.json({ product: products })
    }
      catch(error)
      {
        console.log(error);
        next(error);
      }
    }
    //updating products
    static posteditproduct = async(req, res, next) => {
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
       try{
        const product = await product.findByPk(id);
                product.ProductName = ProductName;
                product.ProductType = ProductType;
                product.price = price;
                 product.save();
               console.log('product updated ')
        }
        catch(erro)
        {
            console.log(error);
            next(error);
        }   
    }
    static postDelProduct = async(req, res, next) => {
        const id = req.params.id;
        try{
        const result =await  product.destroy({
            where: { id: id }
        })
            console.log("product deleted");
            res.json({ msg: "prodcut deleted" })
          }
       catch(err ) {
        console.log(error);
        next(error);
        }
    }
    static searchProductdetails = async(req, res, next) => {
        const ProductName = req.params.ProductName;
         try{
        const result = await product.findAll({ where: { ProductName: ProductName } })
            .then(result => {
                res.json({ user: result })
            })
          }
            catch(err) {
                console.log(error);
                next(error);
            }
    }
}
module.exports = productController;
