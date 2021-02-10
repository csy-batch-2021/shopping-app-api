const { ProductDAO } = require("./product.dao");
const productDAO = new ProductDAO();
const { ProductValidator } = require("./product.validator");

const { ProductService } = require("./product.service");
const productService = new ProductService()


// productService.getAllProduct().then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// })


// productService.getProductDetails(10).then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// })


// productService.getActiveProduct().then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// })


// let product = { brandName: "POCO", name: "poco m3", ram: 3, price: 10000 };

// productService.addProducts(product).then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// })

// const productId = 10;
// const status = false;
// productService.changeStatus(productId, status).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.log(err);
// })