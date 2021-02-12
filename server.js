const express = require("express");
const { OrderController } = require("./order.controller");
const { ProductController } = require("./product.controller");
const { UserController } = require("./user.controller");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();
app.get("/", (req, res) => res.send("REST API- v2"));
app.post("/userLogin", userController.loginUser);
app.post("/addUser", userController.newUserRegistration);
app.get("/activeproducts", productController.getActiveProductsList);
app.post("/addOrder", orderController.addOrder);
app.get("/myorders", orderController.myOrders);
app.get("/orders", orderController.allOrders);
app.listen(port, () => console.log(` app listening on port ${port}!`));
