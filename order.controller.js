const { OrderService } = require("./order.service");

class OrderController {
    constructor() {
        this.orderService = new OrderService()
    }

    async allOrders(req, res) {
        try {
            let orders = await this.orderService.getAllOrder();
            res.json(orders);
        } catch (err) {
            res.setStatus(404).json({ message: err.message });
        }
    }

    async myOrders(req, res) {
        let userId = req.query.userId;
        try {
            let myOrders = await this.orderService.getMyOrder(userId);
            res.json(myOrders);
        } catch (err) {
            res.setStatus(404).json({ message: err.message });

        }
    }

    async changOrderStatus(req, res) {
        let orderId = req.query.orderId;
        let status = req.query.status;
        try {
            let order = await this.orderService.changeOrderStatus(orderId, status);
            res.json(order)
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async addOrder(req, res) {
        try {
            let orderDetails = req.body;
            // console.log(orderDetails);
            let orderedProduct = await this.orderService.addOrder(orderDetails);
            res.json(orderedProduct);
        } catch (err) {
            res.setStatus(400).json({ message: err.message });
        }
    }

    async cancelOrder(req, res) {
        try {
            let orderId = req.query.orderId;
            let order = await this.orderService.cancelOrder(orderId);
            res.json(order);
        } catch (err) {
            res.setStatus(404).json({ message: err.message });
        }
    }
}

exports.OrderController = OrderController;