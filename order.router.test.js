const { OrderRouter } = require("./order.router");
const orderRouter = new OrderRouter();

const res = new Response();
let body = {};
let req = { body: body, query: {} };
let results = orderRouter.sendRequest("orders", "GET", req, res);

const res = new Response();
let body = {};
let req = { body: body, query: { userId: 1 } };
let results = sendRequest("myorders", "GET", req, res);

router.get("/products", orderController.addOrder);


const res = new Response();
let body = { userId: 1, qty: 2, productId: 3 };
let req = { body: body, query: {} };
let results = sendRequest("addneworder", "POST", req, res);

const res = new Response();
let body = {};
let req = { body: body, query: { orderId: 7 } };
let results = sendRequest("cancelorder", "PATCH", req, res);

const res = new Response();
let body = {};
let req = { body: body, query: { orderId: 10, status: "DELIVERED" } };
let results = sendRequest("changeorderstatus", "PATCH", req, res);


results.then(data => {
    console.log(res.toString());
});