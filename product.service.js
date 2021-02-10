
const { ProductDAO } = require("./product.dao");
const productDAO = new ProductDAO();
const { ProductValidator } = require("./product.validator");
class ProductService {

    // to get all products
    async  getAllProduct(params) {
        try {
            var products = await productDAO.findAll();
            return products;
        } catch (err) {
            throw new Error("Not able to fecth products");
        }
    }

    // to find and get particular order
    async  getProductDetails(productId) {
        try {
            var result = await productDAO.findOne(productId);
            if (!result) {
                throw new Error("Please enter valid Prodct Id");
            }
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }


    // to find active Products
    async  getActiveProduct() {
        try {
            var activeProduct = await productDAO.findActive();
            return activeProduct;
        } catch (err) {
            throw new Error("Not able to fetch active products");
        }

    }


    // to add a new product
    async  addProducts(product) {
        try {
            ProductValidator.validateNewProduct(product);//to check validate the products details
            let exists = await productDAO.findOneUsingName(product);//to find and if same product and brandname product is there in db
            if (exists) {
                throw new Error("Product and brand Name already Exists");
            }
            return await productDAO.save(product);

        } catch (err) {
            console.log(err.message);
            throw err;
        }


    }

    // too change the product status active and inactive
    async  changeStatus(productId, status) {
        try {
            var result = await productDAO.findOne(productId);
            console.log(result);

            if (result) {
                let isActive = result.active == 1;
                if (status == isActive) {
                    throw new Error("Already record is " + (isActive ? "Active" : "Inactive"));
                }
                //if (status && result.active == 0) {
                await productDAO.findOneAndUpdate(result.id, !result.active);
                // } else if (status == false && result.active == 1) {
                //    await productDAO.findOneAndUpdate(result.id, 0);
                //} else {
                //  console.log("Not able to change status");
                //}
                // var result = await productDAO.changeStatus(productId, status);
            } else {
                throw new Error("Please Enter valid Product ID");
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
exports.ProductService = ProductService;