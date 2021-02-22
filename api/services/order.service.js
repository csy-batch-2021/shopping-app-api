const { ProductDAO } = require("../dao/product.dao");
const { OrderDAO } = require("../dao/order.dao");
const { UserDAO } = require("../dao/user.dao");
const orderDAO = new OrderDAO();
const productDAO = new ProductDAO();
const userDAO = new UserDAO();

const { ProductValidator } = require("../validator/product.validator");
const { UserValidator } = require("../validator/user.validator");
const { OrderValidator } = require("../validator/order.validator");
class OrderService {
  //get all orders
  static async getAllOrder() {
    try {
      let orders = await OrderDAO.findAll();
      return orders;
    } catch (err) {
      throw new Error("Not able to fetch the orders");
    }
  }

  // to find by order based on user id
  static async getMyOrder(userId) {
    let myOrder = await OrderDAO.findMyOrder(userId);
    return myOrder;
    // console.log(myOrder);
  }
  // to add a new order
  static async addOrder(orderDetails) {
    try {
      await OrderValidator.validCheck(orderDetails);
      await OrderValidator.isValidId(orderDetails);
      const product = await ProductDAO.findOne(orderDetails.productId);
      orderDetails.totalAmount = orderDetails.qty * product.price;
      orderDetails.status = "ORDERED";
      orderDetails.created_date = new Date();
      orderDetails.modified_date = new Date();
      orderDetails.created_by = orderDetails.userId;
      orderDetails.modified_by = orderDetails.userId;
      await OrderValidator.toCheckWalletBalance(orderDetails);
      console.log("orderDetails", orderDetails);
      await OrderDAO.save(orderDetails);
      return "Product Ordered sucessfully";
    } catch (err) {
      throw err;
    }
  }

  // to change order status delivered
  static async changeOrderStatus(orderId, userId, status) {
    try {
      // await OrderValidator.statusValidCheck(orderId, status);
      await OrderValidator.isValidForDelivery(orderId, status);
      // await OrderValidator.toCheckValidOrderId(orderId);
      var result = await OrderDAO.findOneAndUpdate(orderId, status, userId);
      return result;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }


  static async myOrderStatusCount(userId) {
    try {
      let orderValues = await OrderDAO.myOrdersStatusCount(userId);
      return orderValues;
    } catch (err) {
      throw new Error("Not able to fetch the orders");
    }
  }
  static async orderReport() {
    try {
      let reportValues = await OrderDAO.orderReport();
      // console.log("reportValues", reportValues);
      return reportValues;
    } catch (err) {
      throw new Error("Not able to fetch the Report");
    }
  }
  static async orderStatusReport() {
    try {
      let reportValues = await OrderDAO.orderStatusReport();
      // console.log("reportValues", reportValues);
      return reportValues;
    } catch (err) {
      throw new Error("Not able to fetch the Report");
    }
  }

  // to cancel order
  static async cancelOrder(orderDetails) {
    try {
      console.log("orderDetails", orderDetails);

      let userId = orderDetails.userId;
      let orderId = orderDetails.orderId;
      await UserValidator.toCheckValidUserId(userId);
      // // await OrderValidator.isValidCheck(orderId);
      await OrderValidator.isExistOrderId(orderId);
      var result = await OrderDAO.cancelOrder(orderDetails);
      await OrderValidator.walletBalanceRefund(orderDetails);
      console.log(result);
      return "Your Amount Has Successfully Refunded To Your Wallet"
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

exports.OrderService = OrderService;
