const { ProductDAO } = require("../dao/product.dao");
const { OrderDAO } = require("../dao/order.dao");
const { UserDAO } = require("../dao/user.dao");
const orderDAO = new OrderDAO();
const userDAO = new UserDAO();
const productDAO = new ProductDAO();
class OrderValidator {
  static isValidNumber(input, message) {
    let valid = true;
    if (input == null || input <= 0) {
      // valid = false;
      throw new Error(message);
    }
    // return valid;
  }
  static isNumber(input) {
    let valid = true;
    if (input == null || input <= 0) {
      valid = false;
    }
    return valid;
  }
  static async validCheck(orderDetails) {
    // console.log("orderDetails", orderDetails);
    this.isValidNumber(orderDetails.userId, "Please Enter Valid User ID");
    this.isValidNumber(orderDetails.productId, "Please Enter Valid Product Id");
    this.isValidNumber(orderDetails.qty, "Please Enter Valid Quantity");
    // if (isNumber(orderDetails.user_id)) {
    //     throw new Error("Please Enter Valid User ID")
    // } else if (orderDetails.product_id == null || !orderDetails.product_id > 0) {
    //     throw new Error("Please Enter Valid Product Id");
    // } else if (orderDetails.qty == null || !orderDetails.qty > 0) {
    //     throw new Error("Please Enter Valid Quantity");
    // }
  }
  static async isValidId(orderDetails) {
    var userResult = await UserDAO.findOne(orderDetails.userId);
    var productResult = await ProductDAO.findOne(orderDetails.productId);
    if (userResult == undefined) {
      throw new Error("Please Check UserID");
    } else if (productResult == undefined) {
      throw new Error("Please Check ProductID");
    }
  }
  static async statusValidCheck(orderId, status) {
    // console.log("orderId", orderId);
    // console.log("status", status);
    var statusText = ["ORDERED", "DELIVERED", "CANCELLED"];
    var statusCheck = statusText.includes(status);
    console.log("statusCheck", statusCheck);
    if (orderId == null || !orderId > 0) {
      throw new Error("Please Enter Valid Order ID");
    } else if (status == null || !statusCheck) {
      throw new Error("Please Enter Valid Status");
    }
  }
  static async isValidCheck(orderId) {
    if (orderId == null || !orderId > 0) {
      throw new Error("Please Enter Valid Product Id");
    }
  }
  static async isValidForDelivery(orderId, status) {
    var result = await OrderDAO.findOne(orderId);
    var statusText = ["ORDERED", "DELIVERED", "CANCELLED"];
    var statusCheck = statusText.includes(status);
    if (!result) {
      throw new Error("Please Entered Valid OrderId");
    } else if (!statusCheck) {
      throw new Error("Please Enter Valid Status");
    } else if (result.status == "DELIVERED") {
      throw new Error("Delivered Product cannot be Delivered");
    } else if (result.status == "CANCELLED") {
      throw new Error("Already Order Product has been Cancelled");
    }
  }
  static async isExistOrderId(orderId) {
    // console.log("orderId", orderId);
    var result = await OrderDAO.findOne(orderId);
    if (!result) {
      throw new Error("Please Entered Valid OrderId");
    } else if (result.status == "DELIVERED") {
      throw new Error("Delivered Product cannot be cancelled");
    } else if (result.status == "CANCELLED") {
      throw new Error("Already Order Product has been Cancelled");
    }
  }
  static async toCheckValidOrderId(orderId) {
    var result = await OrderDAO.findOne(orderId);
    if (!result) {
      throw new Error("Please Check Order ID");
    }
  }

  static async toCheckWalletBalance(orderDetails) {
    let wallet = await UserDAO.findWalletUserId(orderDetails.userId);
    if (wallet.balance < orderDetails.totalAmount) {
      throw new Error("insufficient Wallet Balance");
    } else {
      let updateWalletbals = wallet.balance - orderDetails.totalAmount;
      await UserDAO.transactionList(orderDetails.userId, orderDetails.qty, -orderDetails.totalAmount, orderDetails.created_date);
      await UserDAO.addWalletBalance(updateWalletbals, orderDetails.userId);
    }
  }

  static async walletBalanceRefund(orderDetails) {

    let cancelledList = await OrderDAO.findOne(orderDetails.orderId);
    let cancelledDate = cancelledList.created_date;
    let transactionList = await UserDAO.allTransactions(cancelledDate);
    let transactionAmount = transactionList.transactions;
    let transactionAmount1 = Math.abs(transactionAmount);
    let transactionId = transactionList.id;
    let transactionUserId = transactionList.user_id;
    let existingBalance = await UserDAO.findWalletUserId(transactionUserId);
    let updateBalances = existingBalance.balance + transactionAmount1;
    await UserDAO.refundWallet(updateBalances, transactionUserId);
    await UserDAO.deleteRefund(transactionId);
  }

}
exports.OrderValidator = OrderValidator;
