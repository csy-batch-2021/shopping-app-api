const pool = require("./config/db");
class ProductRatingDAO {
    static async findAll() {
        const result = await pool.query("select * from products");
        return result[0];
    }

    static async findActive() {
        var id = 1;
        const result = await pool.query("select * from products where active=?", [
            id,
        ]);
        return result[0];
    }

    static async findOneUsingName(product) {
        // const param
        const result = await pool.query(
            "select 1 from products where name=? AND brand_name=?",
            [product.name, product.brandName]
        );
        return result[0].length != 0;
    }
    static async findOne(id) {
        const result = await pool.query("select * from products where id=?", [id]);
        return result[0][0];
    }

    static async findByBrandName(brandname) {
        const result = await pool.query(
            "select * from products where id=?"[brandname]
        );
        return result[0][0];
    }
    static async findOneAndUpdate(productId, status) {
        let params = [status, productId];
        const sql = "UPDATE products SET active=? where id=?";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;
    }

    static async save(productRatingsDetails) {
        console.log("productRatingsDetails for DAO", productRatingsDetails);
        let params = [productRatingsDetails.userId, productRatingsDetails.productId, productRatingsDetails.rating, productRatingsDetails.created_by, productRatingsDetails.modified_by];
        const sql =
            "insert into product_ratings(user_id,product_id,rating,created_by,modified_by) values(?,?,?,?,?)";
        const result = await pool.query(sql, params);
        return result[0].affectedRows;
    }
}

exports.ProductRatingDAO = ProductRatingDAO;
