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
app.post("/api/userLogin", userController.loginUser);
app.post("/api/addUser", userController.newUserRegistration);
app.get("/api/UsersList", userController.getUsersList);
app.patch("/api//changeUserStatus", UserValidator.isAdmin, userController.updateUserStatus);
app.patch("/api/changeUserPassword", userController.updatePassword);

app.patch("/api//addBalance", UserValidator.isAdmin, userController.updateBalance);

app.get("/api/activeproducts", productController.getActiveProductsList);
app.get("/api/getAllProducts", productController.getProducts);

app.post("/api/searchProducts", productController.searchProducts);

app.post("/api/addOrder", orderController.addOrder);
app.post("/api/addNewProducts", productController.addNewProducts);


app.get("/api/getOneProductDetail", productController.getOneProductDetails);
app.patch("/api/changeProductStatus", productController.changeProductStatus);


app.get("/api/myorders", orderController.myOrders);
app.get("/api/orders", orderController.allOrders);
app.post("/api/changeorderstatus", UserValidator.isAdmin, orderController.changOrderStatus);
app.post("/api/cancelorder", orderController.cancelOrder);
app.listen(port, () => console.log(` app listening on port ${port}!`));
