const { UserValidator } = require("../validator/user.validator");

const { OrderService } = require("../services/order.service");
const { OrderValidator } = require("../validator/order.validator");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async allOrders(req, res) {
    try {
      let orders = await OrderService.getAllOrder();
      const allOrdersList = orders.sort(
        (a, b) => b.created_date - a.created_date
      );

      res.json(allOrdersList);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }


  async myOrdersCount(req, res) {
    let userId = req.query.userId;
    try {
      UserValidator.toCheckValidUserId(userId)
      // console.log("userId try block");
      let myOrders = await OrderService.myOrderStatusCount(userId);
      // const myOrdersList = myOrders.sort(
      //   (a, b) => b.created_date - a.created_date
      // );
      // console.table(myOrders);
      res.json(myOrders);
    } catch (err) {
      // console.log(err.message);
      res.status(404).json({ message: err.message });
    }
  }

  async orderReport(req,res) {
    try {
      let orderReport = await OrderService.orderReport();
      res.json(orderReport);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async orderStatusReport(req,res) {
    try {
      let orderStatusReport = await OrderService.orderStatusReport();
      res.json(orderStatusReport);
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
      const myOrdersList = myOrders.sort(
        (a, b) => b.created_date - a.created_date
      );

      // console.log("myOrdersList", myOrdersList);
      res.json(myOrdersList);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async changOrderStatus(req, res) {
    console.log(req.body);

    let orderId = req.body.orderId;
    let userId = req.body.loggedInUserId;
    let status = req.body.status;
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
    let orderId = req.body.orderId;

    try {
      let order = await OrderService.cancelOrder(req.body);
      res.json(order);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

exports.OrderController = OrderController;
