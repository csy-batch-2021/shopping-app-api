const pool = require("../../config/db");

class OrderDAO {
  static async findAll() {
    const result = await pool.query(
      "select o.id,u.user_name,p.name,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id"
    );

    return result[0];
  }

  static async findOne(id) {
    const result = await pool.query("select * from orders where id=?", [id]);
    return result[0][0];
  }

  static async findMyOrder(userId) {
    // const result = await pool.query("select * from orders where user_id=?", [
    //   userId,
    // ]);

    const result = await pool.query(
      "select o.id,u.user_name,p.name,(p.id)as product_id,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id AND o.user_id=?",
      [userId]
    );
    return result[0];
  }

  static async findOneAndUpdate(orderId, status, userId) {
    let params = [status, userId, orderId];
    const sql =
      "UPDATE orders SET status=?,modified_by=?,modified_date=Now() where id=?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }
  static async cancelOrder(orderDetails) {
    let params = ["CANCELLED", orderDetails.userId, orderDetails.orderId];
    console.log(params, "params");

    const sql =
      "UPDATE orders SET status=?,modified_by=?,modified_date=now() where id=?";
    // console.log("sql query", sql);

    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }

  static async myOrdersStatusCount(userId) {
    const result = await pool.query(
      "select status,count(*) as count from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id AND o.user_id=? group by status",
      [userId]
    );
    return result[0];

  }

  static async orderReport() {
    const result = await pool.query("select  *,count(*)as countValues,sum(o.total_amount)as total from orders o,users u ,products p where  p.id=o.product_id and u.id=o.user_id group by o.user_id");
    return result[0];
  }

  static async orderStatusReport() {
    const result = await pool.query("select  status,count(*)as count from orders group by status");
    return result[0];
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
