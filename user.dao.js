const pool = require("./config/db");

class UserDAO {
  constructor() {}
  async findAll() {
    const result = await pool.query("select * from users");
    return result[0];
  }

  async findOne(id) {
    const result = await pool.query("select * from users where id=?", [id]);
    return result[0][0];
  }

  async findActiveUser() {
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

  async save(user) {
    let role = user.role != "" && user.role != null ? user.role : "USER";
    let params = [user.name, user.email, user.password, role];
    const sql =
      "insert into users (user_name,email,password,role,active) values ( ?,?,?,?,1)";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }
  async updatePassword(update) {
    let params = [update.newPassword, update.id];
    const sql = "update users set password = ? where id= ?";
    const result = await pool.query(sql, params);
    return result[0].affectedRows;
  }

  async updateStatus(id, status) {
    const sql = "update users set active= ? where id= ?";
    const result = await pool.query(sql, [status, id]);
    return result[0].affectedRows;
  }
}
exports.UserDAO = UserDAO;
