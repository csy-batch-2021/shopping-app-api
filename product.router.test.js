const { ProductRouter } = require("./product.router");
const productRouter = new ProductRouter();
const { Response } = require("./response");


const res = new Response();
let body = {};
let req = { body: body, query: {} };
// let results = sendRequest("products", "GET", req, res);

// let results = sendRequest("activeproducts", "GET", req, res);

// req.query.productId = 1;
// let results = sendRequest("getproduct", "GET", req, res);

req.body = { userId: 1, name: "Nokia", brandName: "Nokie S3", ram: 4, price: 13000, qty: 1 };
let results = productRouter.sendRequest("addNewProduct", "POST", req, res);

// req.query = { productId: 1, status: false }
// let results = sendRequest("changeProductStatus", "PATCH", req, res);



results.then(data => {
    console.log(res.toString());
});

