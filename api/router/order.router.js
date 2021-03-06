const { Response } = require("../../response");
const { OrderController } = require("./order.controller");
const orderController = new OrderController();

class OrderRouter {
  constructor() { }

  async sendRequest(url, method, req, res) {
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
      if (method == "POST") {
        await orderController.cancelOrder(req, res);
      }
    } else if (url == "changeorderstatus") {
      if (method == "POST") {
        await orderController.changOrderStatus(req, res);
      }
    }
    else if (url == "orderStatusCount") {
      if (method == "GET") {
        await orderController.myOrdersCount(req, res);
      }
    } else if (url == "orderReport") {
      if (method == "GET") {
        await orderController.orderReport(req, res);
      }
    } else if (url == "orderStatusReport") {
      if (method == "GET") {
        await orderController.orderStatusReport(req, res);
      }
    }


  }
}

exports.OrderRouter = OrderRouter;
