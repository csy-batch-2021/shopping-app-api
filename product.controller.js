const { ProductService } = require("./product.service");
class ProductController {
  //productService ;
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req, res) {
    let products = await ProductService.getAllProduct();
    res.json(products);
  }

  async getOneProductDetails(req, res) {
    let productId = req.query.productId;

    try {
      let productDetail = await ProductService.getProductDetails(productId);
      res.json(productDetail);
    } catch (err) {
      res.setStatus(404).json({ message: err.message });
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
      res.setStatus(400).json({ message: err.message });
    }
  }

  async changeProductStatus(req, res) {
    let productId = req.query.productId;
    let status = req.query.status;
    try {
      let changedProduct = await ProductService.changeStatus(productId, status);
      res.json(changedProduct);
    } catch (err) {
      res.setStatus(400).json({ message: err.message });
    }
  }
}

exports.ProductController = ProductController;
