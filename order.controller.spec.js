const { OrderController } = require("./order.controller");
const { Response } = require("./response");

const orderController = new OrderController();


function allOrders() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: {} };
    orderController.allOrders(req, res).then(data => {
        console.log(res.toString());
    })
}
//todo testMyOrderWithInvalidUserId
function invalidMyOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { userId: 10 } };
    orderController.myOrders(req, res).then(data => {
        console.log(res.toString());
    })
}

// testMyOrderWithValidUserId
function validMyOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { userId: 1 } };
    orderController.myOrders(req, res).then(data => {
        console.log(res.toString());
    })
}

function orderidInvalidstatusChange() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 10, status: "DELIVERED" } };

    orderController.changOrderStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function statusInvalidstatusChange() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 1, status: "NOSTATUS" } };

    orderController.changOrderStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function invalidstatusChangeForDelivered() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 1, status: "DELIVERED" } };

    orderController.changOrderStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function invalidstatusChangeForCancelled() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 2, status: "DELIVERED" } };

    orderController.changOrderStatus(req, res).then(data => {
        console.log(res.toString());

    })
}

function validStatusChange() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 4, status: "DELIVERED" } };

    orderController.changOrderStatus(req, res).then(data => {
        console.log(res.toString());
    })
}


function userIdinValidCheckForOrder() {
    const res = new Response();
    let body = { userId: 10, qty: 2, productId: 4 };
    let req = { body: body, query: {} };
    orderController.addOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function qtyInvalidCheckForOrder() {
    const res = new Response();
    let body = { userId: 1, qty: 0, productId: 4 };
    let req = { body: body, query: {} };
    orderController.addOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function qtyNullCheckForOrder() {
    const res = new Response();
    let body = { userId: 1, qty: null, productId: 4 };
    let req = { body: body, query: {} };
    orderController.addOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function productIdInvalidCheckForOrder() {
    const res = new Response();
    let body = { userId: 1, qty: 0, productId: 10 };
    let req = { body: body, query: {} };
    orderController.addOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function validOrder() {
    const res = new Response();
    let body = { userId: 1, qty: 2, productId: 2 };
    let req = { body: body, query: {} };
    orderController.addOrder(req, res).then(data => {
        console.log(res.toString());

    })
}

function invalidOrderIdCheckForCancelOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 10 } }

    orderController.cancelOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function deliveredOrderCheckForCancelOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 1 } }

    orderController.cancelOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function cancelledOrderCheckForCancelOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 2 } }

    orderController.cancelOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

function validCancelOrder() {
    const res = new Response();
    let body = {};
    let req = { body: body, query: { orderId: 6 } }

    orderController.cancelOrder(req, res).then(data => {
        console.log(res.toString());
    })
}

// allOrders();
// invalidMyOrder();
// validMyOrder();
// orderidInvalidstatusChange();
// statusInvalidstatusChange();
// invalidstatusChangeForDelivered();
// invalidstatusChangeForCancelled();
// validStatusChange();
// userIdinValidCheckForOrder();
// qtyInvalidCheckForOrder();
// qtyNullCheckForOrder();
// productIdInvalidCheckForOrder();
// validOrder();
// invalidOrderIdCheckForCancelOrder();
// deliveredOrderCheckForCancelOrder();
// cancelledOrderCheckForCancelOrder();
// validCancelOrder();