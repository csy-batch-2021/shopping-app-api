
const pool = require("./config/db");

class OrderDAO {

    async findAll() {
        const result = await pool.query("select * from orders");
        return result[0];
    }

    async findOne(id) {
        const result = await pool.query("select * from orders where id=?", [id]);
        return result[0][0];
    }

    async findMyOrder(userId) {
        const result = await pool.query("select * from orders where user_id=?", [userId]);
        return result[0][0];
    }

    async findOneAndUpdate(orderId, status) {
        let params = [status, orderId];
        const sql = "UPDATE orders SET status=? where id=?";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;
    }
    async cancelOrder(orderId) {
        let params = ["CANCELLED", orderId];
        const sql = "UPDATE orders SET status=? where id=?";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;

    }
    async save(orders) {
        let params = [orders.user_id, orders.product_id, orders.qty, orders.totalAmount, orders.status];
        const sql = "insert into orders (user_id,product_id,qty,total_amount,status) values (?,?,?,?,?)";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;
    }
}

exports.OrderDAO = OrderDAO;
