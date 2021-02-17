const { UserValidator } = require("./user.validator");

const { OrderService } = require("./order.service");
const { OrderValidator } = require("./order.validator");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async allOrders(req, res) {
    try {
      let orders = await OrderService.getAllOrder();
      res.json(orders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async myOrders(req, res) {
    let userId = req.query.userId;

    try {
      console.log("userId try block", userId);

      OrderValidator.isValidNumber(userId, "Please Enter Valid User ID");
      let myOrders = await OrderService.getMyOrder(userId);
      res.json(myOrders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async changOrderStatus(req, res) {
    console.log(req.body);

    let orderId = req.body.orderId;
    let userId = req.body.loggedInUserId;
    let status = req.body.status
    try {
      let order = await OrderService.changeOrderStatus(orderId, userId, status);
      res.json(order);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async addOrder(req, res) {
    try {
      let orderDetails = req.body;
      console.log("orderDetails", orderDetails);
      let orderedProduct = await OrderService.addOrder(orderDetails);
      res.json(orderedProduct);
    } catch (err) {
      console.log("err.message", err.message);
      res.status(400).json({ message: err.message });
    }
  }

  async cancelOrder(req, res) {
    // let orderId = req.query.orderId;
    // console.log("orderId", orderId);

    try {
      let order = await OrderService.cancelOrder(req.body);
      res.json(order);
    } catch (err) {

      res.status(404).json({ message: err.message });
    }
  }
}

exports.OrderController = OrderController;
