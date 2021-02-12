const { UserValidator } = require("./user.validator")
const { UserDAO } = require("./user.dao");
class ProductValidator {
    static validateNewProduct(product) {
        if (product.brandName == null || product.brandName.trim().length == 0) {
            throw new Error("please enter validate BrandName");
        } else if (product.name == null || product.name.trim().length == 0) {
            throw new Error("please enter validate Name");
        }
        else if (product.userId == null || product.userId <= 0) {
            throw new Error("please enter validate UserId");
        }
        else if (product.ram == null || product.ram <= 0) {
            throw new Error("please enter validate Ram");
        } else if (product.price == null || product.price <= 0) {
            throw new Error("please enter validate Price");
        }
    }

    static async validateUserAndRole(product) {
        try {
            var result = await userDAO.findOne(userId);
            console.log("Result", result);

            if (!result) {
                throw new Error("Please Check User ID");
            }
        } catch (err) {
            console.log("Error", err.message);

        }

    }
}

exports.ProductValidator = ProductValidator;