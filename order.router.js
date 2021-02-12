const { Response } = require("./response");
const { OrderController } = require("./order.controller");
const orderController = new OrderController;

async function sendRequest(url, method, req, res) {
    if (url == "orders") {
        if (method == "GET") {
            await orderController.allOrders(req, res);
            // console.log(res.toString());
        }
    } else if (url == "myorders") {
        if (method == "GET") {
            await orderController.myOrders(req, res);
        }
    } else if (url == "addneworder") {
        if (method == "POST") {
            await orderController.addOrder(req, res);

        }
    } else if (url == "cancelorder") {
        if (method == "PATCH") {
            await orderController.cancelOrder(req, res);
        }
    } else if (url == "changeorderstatus") {
        if (method == "PATCH") {
            await orderController.changOrderStatus(req, res);
        }
    }

}


// const res = new Response();
// let body = {};
// let req = { body: body, query: {} };
// let results = sendRequest("orders", "GET", req, res);

// const res = new Response();
// let body = {};
// let req = { body: body, query: { userId: 1 } };
// let results = sendRequest("myorders", "GET", req, res);

// router.get("/products", orderController.addOrder);


// const res = new Response();
// let body = { userId: 1, qty: 2, productId: 3 };
// let req = { body: body, query: {} };
// let results = sendRequest("addneworder", "POST", req, res);

// const res = new Response();
// let body = {};
// let req = { body: body, query: { orderId: 7} };
// let results = sendRequest("cancelorder", "PATCH", req, res);

const res = new Response();
let body = {};
let req = { body: body, query: { orderId: 8, status: "DELIVERED" } };
let results = sendRequest("changeorderstatus", "PATCH", req, res);


results.then(data => {
    console.log(res.toString());
});