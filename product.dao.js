const pool = require("./config/db");
class ProductDAO {


    async findAll() {
        const result = await pool.query("select * from products");
        return result[0];
    }



    async findActive() {
        var active = 1;
        const result = await pool.query("select * from products where active=?", [active]);
        return result[0];
    }

    async findOneUsingName(product) {
        // const param
        const result = await pool.query("select 1 from products where name=? AND brand_name=?", [product.name, product.brandName])
        return result[0].length != 0;
    }
    async findOne(id) {
        const result = await pool.query("select * from products where id=?", [id]);
        return result[0][0];

    }

    async findByBrandName(brandname) {
        const result = await pool.query("select * from products where id=?"[brandname]);
        return result[0][0];
    }
    async findOneAndUpdate(productId, status) {
        let params = [status, productId];
        const sql = "UPDATE products SET active=? where id=?";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;

    }

    async save(product) {
        let params = [product.name, product.brandName, product.ram, product.price];
        const sql = "insert into products(name,brand_name,ram,price,active) values(?,?,?,?,1)";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;
    }



}

exports.ProductDAO = ProductDAO;