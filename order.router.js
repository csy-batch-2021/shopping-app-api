const { Response } = require("./response");
const { OrderController } = require("./order.controller");
const orderController = new OrderController;

async function send(params) {

}

router.get("/products", orderController.addOrder);