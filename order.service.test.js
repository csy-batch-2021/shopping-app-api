const { OrderService } = require("./order.service");
const { OrderDAO } = require("./order.dao");
const orderDAO = new OrderDAO();
const orderService = new OrderService();

// const orderDetails = {
//     user_id: 1, product_id: 1, qty: 1
// }
// orderService.addOrder(orderDetails).then(response => {
//     console.log(response);

// }).catch(err => {
//     console.log(err);

// });

// orderService.getAllOrder().then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// });


// const userId = 2;
// orderService.getMyOrder(userId).then(response => {
//     console.table(response);

// }).catch(err => {
//     console.log(err);

// })

// var orderId = 1;
// var status = "DELIVERED";

// orderDAO.findOne(orderId).then(response => {
//     console.log("Find one response", response);

// })

// orderService.changeOrderStatus(orderId, status).then(response => {
//     console.log("response", response);
// }).catch(err => {
//     console.log(err);
// });


// var orderId = 3;
// orderService.cancelOrder(orderId).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.log(err);
// });