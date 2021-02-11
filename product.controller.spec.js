const { ProductController } = require("./product.controller");
const { Response } = require("./response");


const productController = new ProductController();

function getAllProducts() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: {} };
    productController.getProducts(req, res).then(data => {
        console.log(res.toString());
    })
}

function getValidProduct() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { productId: 10 } };

    productController.getOneProductDetails(req, res).then(data => {
        console.log(res.toString());

    })
}

//todo rename
function getInvalidProduct() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { productId: 10 } };

    productController.getOneProductDetails(req, res).then(data => {
        console.log(res.toString());

    })
}

function getActiveProducts() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: {} };
    productController.getActiveProductsList(req, res).then(data => {
        console.log(res.toString());
    });
}

function nameInvalidCheck() {
    const res = new Response();
    let body = { name: "", brandName: "POCO", ram: 4, };
    let req = { body: body, query: {} };
    productController.addNewProducts(req, res).then(data => {
        console.log(res);

    })
}

function brandNameInValidCheck() {
    const res = new Response();
    let body = { name: "poco m3", brandName: "", ram: 4, };
    let req = { body: body, query: {} };
    productController.addNewProducts(req, res).then(data => {
        console.log(res);

    })
}

function ramInValidCheck() {
    const res = new Response();
    let body = { name: "poco m3", brandName: "POCO", ram: 0, };
    let req = { body: body, query: {} };
    productController.addNewProducts(req, res).then(data => {
        console.log(res);

    })
}

function priceInValidCheck() {
    const res = new Response();
    let body = { name: "poco m3", brandName: "POCO", ram: 4, price: 0, };
    let req = { body: body, query: {} };
    productController.addNewProducts(req, res).then(data => {
        console.log(res);

    })
}

function newProducts() {
    const res = new Response();
    let body = { name: "realme 7 pro", brandName: "RealMe", ram: 4, price: 10000 };
    let req = { body: body, query: {} };
    productController.addNewProducts(req, res).then(data => {
        console.log(res.toString());
    });
}

function statusInvalidActiveCheck() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { productId: 2, status: true } };

    productController.changeProductStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function statusInvalidInactiveCheck() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { productId: 1, status: false } };

    productController.changeProductStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function statusCheck() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { productId: 5, status: true } };

    productController.changeProductStatus(req, res).then(data => {
        console.log(res.toString());

    })

}


// getAllProducts();
// getValidProduct();
// getInvalidProduct();
// getActiveProducts();
// nameinValidCheck();
// brandNameInValidCheck();
// ramInValidCheck();
// priceInValidCheck();
// newProducts();
// statusInvalidActiveCheck();
// statusInvalidInactiveCheck();

statusCheck();