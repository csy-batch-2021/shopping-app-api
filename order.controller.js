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
      OrderValidator.isValidNumber(userId, "Please Enter Valid User ID");
      let myOrders = await OrderService.getMyOrder(userId);
      res.json(myOrders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async changOrderStatus(req, res) {
    let orderId = req.query.orderId;
    let status = req.query.status;
    try {
      let order = await OrderService.changeOrderStatus(orderId, status);
      res.json(order);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async addOrder(req, res) {
    try {
      let orderDetails = req.body;
      // console.log(orderDetails);
      let orderedProduct = await OrderService.addOrder(orderDetails);
      res.json(orderedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async cancelOrder(req, res) {
    try {
      let orderId = req.query.orderId;
      let order = await OrderService.cancelOrder(orderId);
      res.json(order);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

exports.OrderController = OrderController;
