const pool = require("./config/db");

class OrderDAO {
  static async findAll() {
    const result = await pool.query("select * from orders");
    return result[0];
  }

  static async findOne(id) {
    const result = await pool.query("select * from orders where id=?", [id]);
    return result[0][0];
  }

  static async findMyOrder(userId) {
    const result = await pool.query("select * from orders where user_id=?", [
      userId,
    ]);
    return result[0];
  }

  static async findOneAndUpdate(orderId, status) {
    let params = [status, orderId];
    const sql = "UPDATE orders SET status=? where id=?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }
  static async cancelOrder(orderId) {
    let params = ["CANCELLED", orderId];
    const sql = "UPDATE orders SET status=? where id=?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }

  static async save(orders) {
    let params = [
      orders.userId,
      orders.productId,
      orders.qty,
      orders.totalAmount,
      orders.status,
      orders.created_date,
      orders.modified_date,
      orders.created_by,
      orders.modified_by,
    ];
    const sql =
      "insert into orders (user_id,product_id,qty,total_amount,status,created_date,modified_date,created_by,modified_by) values (?,?,?,?,?,?,?,?,?)";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }
}

exports.OrderDAO = OrderDAO;
