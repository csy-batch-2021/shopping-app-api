const { ProductDAO } = require("./product.dao");
const { OrderDAO } = require("./order.dao");
const { UserDAO } = require("./user.dao");
const orderDAO = new OrderDAO();
const productDAO = new ProductDAO();
const userDAO = new UserDAO();


const { ProductValidator } = require("./product.validator");
const { UserValidator } = require('./user.validator');
const { OrderValidator } = require('./order.validator');
class OrderService {

    //get all orders
    async getAllOrder() {
        try {
            let orders = await orderDAO.findAll();
            return orders;
        } catch (err) {
            throw new Error("Not able to fetch the orders");
        }

    }

    // to find by order based on user id
    async getMyOrder(userId) {

        try {
            // let result = await userDAO.findOne(userId);
            // console.log("UserResult", result);

            await UserValidator.toCheckValidUserId(userId);

            let myOrder = await orderDAO.findMyOrder(userId);
            return myOrder;
        } catch (err) {
            throw new Error("Please enter valid userId");

        }

    }
    // to add a new order
    async  addOrder(orderDetails) {
        try {
            await OrderValidator.validCheck(orderDetails);
            await OrderValidator.isValidId(orderDetails);
            const product = await productDAO.findOne(orderDetails.productId);
            orderDetails.totalAmount = orderDetails.qty * product.price;
            orderDetails.status = "ORDERED";
            await orderDAO.save(orderDetails);
            return "Product Ordered sucessfully";
        } catch (err) {
            console.log(err.message);
            throw err;
        }

    }

    // to change order status delivered
    async  changeOrderStatus(orderId, status) {
        try {
            // await OrderValidator.statusValidCheck(orderId, status);
            await OrderValidator.isValidForDelivery(orderId, status);
            // await OrderValidator.toCheckValidOrderId(orderId);
            var result = await orderDAO.findOneAndUpdate(orderId, status);
            return result;
        } catch (err) {
            console.log(err.message);
        }
    }

    // to cancel order
    async  cancelOrder(orderId) {
        try {
            // await OrderValidator.isValidCheck(orderId);
            await OrderValidator.isExistOrderId(orderId);
            var result = await orderDAO.cancelOrder(orderId);
            return "Order Cancelled Successfully";
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}

exports.OrderService = OrderService;