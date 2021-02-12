const { ProductDAO } = require("./product.dao");

const { ProductValidator } = require("./product.validator");
class ProductService {
  // to get all products
  static async getAllProduct(params) {
    try {
      var products = await ProductDAO.findAll();
      return products;
    } catch (err) {
      throw new Error("Not able to fecth products");
    }
  }

  // to find and get particular order
  static async getProductDetails(productId) {
    try {
      var result = await ProductDAO.findOne(productId);
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
  static async getActiveProduct() {
    try {
      var activeProduct = await ProductDAO.findActive();
      return activeProduct;
    } catch (err) {
      throw new Error("Not able to fetch active products");
    }
  }

  // to add a new product
  static async addProducts(product) {
    try {
      ProductValidator.validateNewProduct(product); //to check validate the products details
      let exists = await ProductDAO.findOneUsingName(product); //to find and if same product and brandname product is there in db
      if (exists) {
        throw new Error("Product and brand Name already Exists");
      }
      return await ProductDAO.save(product);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // too change the product status active and inactive
  static async changeStatus(productId, status) {
    try {
      var result = await ProductDAO.findOne(productId);
      console.log(result);

      if (result) {
        let isActive = result.active == 1;
        if (status == isActive) {
          throw new Error(
            "Already record is " + (isActive ? "Active" : "Inactive")
          );
        }
        //if (status && result.active == 0) {
        await ProductDAO.findOneAndUpdate(result.id, !result.active);
        // } else if (status == false && result.active == 1) {
        //    await ProductDAO.findOneAndUpdate(result.id, 0);
        //} else {
        //  console.log("Not able to change status");
        //}
        // var result = await ProductDAO.changeStatus(productId, status);
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
