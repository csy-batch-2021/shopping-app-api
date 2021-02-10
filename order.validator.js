

const { ProductDAO } = require("./product.dao");
const { OrderDAO } = require("./order.dao");
const { UserDAO } = require("./user.dao");
const orderDAO = new OrderDAO();

const userDAO = new UserDAO();
const productDAO = new ProductDAO();


class OrderValidator {

    static isValidNumber(input, message) {
        let valid = true;
        if (input == null || !input > 0) {
            // valid = false;
            throw new Error(message);
        }
        // return valid;
    }

    static isNumber(input) {
        let valid = true;
        if (input == null || !input > 0) {
            valid = false;
        }
        return valid;
    }
    static async   validCheck(orderDetails) {
        console.log("orderDetails", orderDetails);
        isValidNumber(orderDetails.user_id, "Please Enter Valid User ID");
        isValidNumber(orderDetails.product_id, "Please Enter Valid Product Id");
        isValidNumber(orderDetails.qty, "Please Enter Valid Quantity");
        // if (isNumber(orderDetails.user_id)) {

        //     throw new Error("Please Enter Valid User ID")


        // } else if (orderDetails.product_id == null || !orderDetails.product_id > 0) {
        //     throw new Error("Please Enter Valid Product Id");
        // } else if (orderDetails.qty == null || !orderDetails.qty > 0) {
        //     throw new Error("Please Enter Valid Quantity");
        // }
    }

    static async isValidId(orderDetails) {
        var userResult = await userDAO.findOne(orderDetails.user_id);
        var productResult = await productDAO.findOne(orderDetails.product_id);

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
        console.log(statusCheck);

        if (orderId == null || !orderId > 0) {
            throw new Error("Please Enter Valid Order ID")
        } else if (status == null || !statusCheck) {
            throw new Error("Please Enter Valid Status");
        }

    }
    static async isValidCheck(orderId) {
        if (orderId == null || !orderId > 0) {
            throw new Error("Please Enter Valid Product Id");
        }
    }

    static async isExistOrderId(orderId) {
        // console.log("orderId", orderId);
        var result = await orderDAO.findOne(orderId);
        // console.log(result.status);
        if (!result) {
            throw new Error("Please Entered Valid OrderId");
        } else if (result.status == "DELIVERED") {
            throw new Error("Delivered Product cannot be cancelled");
        } else if (result.status == "CANCELLED") {
            throw new Error("Already Order Product has been Cancelled");
        }

    }

    static async toCheckValidOrderId(orderId) {
        var result = await orderDAO.findOne(orderId);
        if (!result) {
            throw new Error("Please Check Order ID");
        }
    }
}

exports.OrderValidator = OrderValidator;