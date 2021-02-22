const { ProductService } = require("../services/product.service");
class ProductController {
  //productService ;
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req, res) {
    let products = await ProductService.getAllProduct();
    res.json(products);
  }

  async searchProducts(req, res) {
    console.log("req.body", req.body);
    let products = await ProductService.searchProducts(req.body);
    res.json(products);
  }
  // searchProducts
  async getOneProductDetails(req, res) {
    let productId = req.query.productId;
    console.log("productId", productId);

    try {
      let productDetail = await ProductService.getProductDetails(productId);
      res.json(productDetail);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getActiveProductsList(req, res) {
    let activeProducts = await ProductService.getActiveProduct();
    res.json(activeProducts);
  }

  async addNewProducts(req, res) {
    // console.log();
    try {
      let newProducts = await ProductService.addProducts(req.body);
      res.json(newProducts);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async addProductRating(req, res) {
    try {
      let productsRating = await ProductService.addProductRating(req.body);
      res.json(productsRating);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }

  async getProgressProductCount(req, res) {
    try {
      let products = await ProductService.getProductCount();
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }
  async productReport(req, res) {
    try {
      let products = await ProductService.productReport();
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }


  async changeProductStatus(req, res) {
    let productId = req.body.productId;
    let status = req.body.status;
    console.log("ProductId", productId);
    console.log("status", status);

    try {
      let changedProduct = await ProductService.changeStatus(productId, status);
      res.json(changedProduct);
    } catch (err) {
      res.setStatus(400).json({ message: err.message });
    }
  }
}

exports.ProductController = ProductController;
