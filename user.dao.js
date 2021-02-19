const pool = require("./config/db");

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

  static async findWalletUserId(id) {
    const result = await pool.query("select * from wallet where user_id=?", [id]);
    return result[0][0];
  }

  static async userFullList() {
    const result = await pool.query("select w.user_id,user_name,email,role,balance from users u join wallet w on (w.id = u.id)");
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

  static async updatePassword(hash, update) {
    let params = [hash, update.id];
    const sql = "update users set password = ? where id= ?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }

  static async updateStatus(id, status) {
    const sql = "update users set active= ? where id= ?";
    const result = await pool.query(sql, [status, id]);
    return result[0].affectedRows;
  }
}
exports.UserDAO = UserDAO;
