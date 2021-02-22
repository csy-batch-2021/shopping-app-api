const pool = require("../../config/db");

class UserDAO {
  constructor() { }

  static async findAll() {
    const result = await pool.query("select * from users");
    return result[0];
  }

  static async findOne(id) {
    const result = await pool.query("select * from users where id=?", [id]);
    return result[0][0];
  }

  static async findActiveUser() {
    const result = await pool.query("select * from users where active = 1");
    return result[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("select 1 from users where email=?", [
      email,
    ]);
    return result[0].length != 0;
  }

  static async findUser(email) {
    const result = await pool.query("select * from users where email=?", [
      email,
    ]);
    return result[0];
  }

  static async deleteRefund(id) {
    const result = await pool.query("delete from transactions where id =?", [id]);
    return result[0];
  }

  static async refundWallet(updateBalances, transactionUserId) {
    let params = [updateBalances, transactionUserId]
    const sql = "update wallet set balance =? where user_id =?";
    const result = await pool.query(sql, params);
    return result[0];
  }

  static async allTransactions(cancelledDate) {
    const result = await pool.query("select * from transactions where transaction_date =?", [cancelledDate]);
    return result[0][0];
  }

  static async transactionList(userId, qty, transaction, transaction_date) {
    let params = [userId, qty, transaction, transaction_date];
    const sql = "insert into transactions(user_id,qty,transactions,transaction_date) values (?,?,?,?)";
    const result = await pool.query(sql, params);
    return result[0];
  }

  static async findWalletUserId(id) {
    const result = await pool.query("select * from wallet where user_id=?", [
      id,
    ]);
    return result[0][0];
  }

  static async userFullList() {
    const result = await pool.query(
      "select u.id,user_name,email,role,balance from users u right join wallet w on (u.id = w.user_id)"
    );
    return result[0];
  }

  static async createWalletAccount(userId) {
    let params = [userId];
    const sql = "insert into wallet(user_id,balance) values (?,0)";
    const result = await pool.query(sql, params);
    return result[0];
  }

  static async addWalletBalance(bals, id) {
    const sql = "update wallet set balance =? where user_id =?";
    const result = await pool.query(sql, [bals, id]);
    return result[0];
  }

  static async save(user, hash) {
    let role = user.role != "" && user.role != null ? user.role : "USER";
    let params = [user.name, user.email, hash, role];
    const sql =
      "insert into users (user_name,email,password,role,active) values ( ?,?,?,?,1)";
    const result = await pool.query(sql, params);
    return result[0];
  }

  static async updatePassword(hash, userId) {
    let params = [hash, userId];
    const sql = "update users set password = ? where id= ?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }

  static async updateStatus(id, status) {
    const sql = "update users set active= ? where id= ?";
    const result = await pool.query(sql, [status, id]);
    return result[0].affectedRows;
  }

  static async userReport() {
    const result = await pool.query("select u.user_name,count(*)as countValues,sum(o.total_amount)as total from orders o,users u  where  u.id=o.user_id group by u.id");
    return result[0];
  }

}
exports.UserDAO = UserDAO;
