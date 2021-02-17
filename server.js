const express = require("express");
const cors = require("cors");
require("dotenv-flow").config();

const { OrderController } = require("./order.controller");
const { ProductController } = require("./product.controller");
const { UserController } = require("./user.controller");
const { UserValidator } = require("./user.validator");

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();

const app = express();
app.use(express.json());
app.use(cors());
// Create Routes
const apiRoutes = require("./app");
//console.log(apiRoutes);

// User Details
app.post("/userLogin", userController.loginUser);
app.post("/addUser", userController.newUserRegistration);
app.get("/UsersList", userController.getUsersList);
app.patch(
  "/changeUserStatus",
  UserValidator.isAdmin,
  userController.updateUserStatus
);

app.patch("/addBalance", UserValidator.isAdmin, userController.updateBalance);

// Products
app.get("/api/activeproducts", productController.getActiveProductsList);
app.post("/api/searchProducts", productController.searchProducts);
app.post("/api/addNewProducts", productController.addNewProducts);
app.get("/api/getOneProductDetail", productController.getOneProductDetails);
app.patch("/api/changeProductStatus", productController.changeProductStatus);
app.get("/api/getAllProducts", productController.getProducts);

// Orders
app.post("/api/addOrder", orderController.addOrder);
app.get("/api/myorders", orderController.myOrders);
app.get("/api/orders", orderController.allOrders);
app.post(
  "/api/changeorderstatus",
  UserValidator.isAdmin,
  orderController.changOrderStatus
);
app.post("/api/cancelorder", orderController.cancelOrder);

app.get("/", (req, res) => {
  res.send("Success");
});
// Create Commmon Error Handler
app.use(function (err, req, res, next) {
  console.log("common error handler");
  console.error(err);
  res.status(500).json({ errorMessage: err.message });
});

const port = process.env.PORT || 3000;
console.log(process.env.DB_HOST);
app.listen(port, () => console.log(` app listening on port ${port}!`));
