const { ProductDAO } = require("./product.dao");
class ProductValidator {
    static validateNewProduct(product) {
        if (product.name == null || product.name.trim().length == 0) {
            throw new Error("please enter validate Name");
        } else if (product.brandName == null || product.brandName.trim().length == 0) {
            throw new Error("please enter validate BrandName ");
        } else if (product.ram == null || product.ram <= 0) {
            throw new Error("please enter validate Ram");
        } else if (product.price == null || product.price <= 0) {
            throw new Error("please enter validate Price");
        }
    }
    static async toCheckValidProductId(productId) {
        var result = await ProductDAO.findOne(productId);

        if (!result) {
            throw new Error("Please Check Product ID");
        }
    }

}

exports.ProductValidator = ProductValidator;