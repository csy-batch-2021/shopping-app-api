const { Response } = require("./response");
const { ProductController } = require("./product.controller");
const productController = new ProductController();

class ProductRouter {

    async  sendRequest(url, method, req, res) {
        if (url == "products") {
            if (method == "GET") {
                await productController.getProducts(req, res);
                // console.log(res.toString());
            }
        } else if (url == "activeproducts") {
            if (method == "GET") {
                await productController.getActiveProductsList(req, res);
            }
        } else if (url == "getproduct") {
            if (method == "GET") {
                await productController.getOneProductDetails(req, res);
            }
        }
        else if (url == "addNewProduct") {
            if (method == "POST") {
                await productController.addNewProducts(req, res);

            }
        } else if (url == "changeProductStatus") {
            if (method == "PATCH") {
                await productController.changeProductStatus(req, res);
            }
        } else if (url == "searchProducts") {
            if (method == "POST") {
                await productController.searchProducts(req, res);
            }
        } else if (url == "getOneProductDetail") {
            if (method == "GET") {
                await productController.getOneProductDetails(req, res);
            }
        }
    }


}

exports.ProductRouter = ProductRouter;