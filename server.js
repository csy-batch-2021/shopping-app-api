const express = require("express");
const cors = require("cors");
require('dotenv-flow').config();
const { OrderController } = require("./order.controller");
const { ProductController } = require("./product.controller");
const { UserController } = require("./user.controller");
const { UserValidator } = require("./user.validator");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();
app.get("/", (req, res) => res.send("REST API- v2"));
app.post("/userLogin", userController.loginUser);
app.post("/addUser", userController.newUserRegistration);
app.get("/activeproducts", productController.getActiveProductsList);

app.post("/searchProducts", productController.searchProducts);

app.post("/addOrder", orderController.addOrder);
app.post("/addNewProducts", productController.addNewProducts);


app.get("/getOneProductDetail", productController.getOneProductDetails);
app.patch("/changeProductStatus", productController.changeProductStatus);


app.get("/myorders", orderController.myOrders);
app.get("/orders", orderController.allOrders);
app.patch("/changeorderstatus", UserValidator.isAdmin, orderController.changOrderStatus);
app.patch("/cancelorder", orderController.cancelOrder);
app.listen(port, () => console.log(` app listening on port ${port}!`));
