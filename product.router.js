const { Response } = require("./response");
const { ProductController } = require("./product.controller");
const productController = new ProductController();

async function sendRequest(url, method, req, res) {
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
    }
}


const res = new Response();
let body = {};
let req = { body: body, query: {} };
// let results = sendRequest("products", "GET", req, res);

// let results = sendRequest("activeproducts", "GET", req, res);

// req.query.productId = 1;
// let results = sendRequest("getproduct", "GET", req, res);

req.body = { name: "Nokia", brandName: "Nokie S3", ram: 4, price: 13000, qty: 1 };
let results = sendRequest("addNewProduct", "POST", req, res);

// req.query = { productId: 1, status: false }
// let results = sendRequest("changeProductStatus", "PATCH", req, res);



results.then(data => {
    console.log(res.toString());
});