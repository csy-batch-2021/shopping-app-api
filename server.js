const express = require("express");
const cors = require("cors");
require("dotenv-flow").config();
const { OrderController } = require("./api/controller/order.controller");
const { ProductController } = require("./api/controller/product.controller");
const { UserController } = require("./api/controller/user.controller");
const { UserValidator } = require("./api/validator/user.validator");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/views/"));

// index page
app.get("/", function (req, res) {
  res.render("index");
});

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();
app.get("/api", (req, res) => res.send("REST API- v2"));
app.post("/api/userLogin", userController.loginUser);
app.post("/api/addUser", userController.newUserRegistration);
app.get("/api/UsersList", userController.getUsersList);
app.get("/api/userLists", userController.userLists);

app.patch(
  "/api/changeUserStatus",
  UserValidator.isAdmin,
  userController.updateUserStatus
);
app.put("/api/changeUserPassword", userController.updatePassword);

app.put("/api/walletBalance", userController.wallet);

app.put("/api/addBalance", UserValidator.isAdmin, userController.updateBalance);

app.get("/api/activeproducts", productController.getActiveProductsList);
app.get("/api/getAllProducts", productController.getProducts);

app.post("/api/searchProducts", productController.searchProducts);

app.post("/api/addOrder", orderController.addOrder);
app.post("/api/addNewProducts", productController.addNewProducts);

app.get("/api/getOneProductDetail", productController.getOneProductDetails);
app.post(
  "/api/changeProductStatus",
  UserValidator.isAdmin,
  productController.changeProductStatus
);
app.post("/api/addProductRating", productController.addProductRating);

app.get("/api/myorders", orderController.myOrders);
app.get("/api/orders", orderController.allOrders);
app.post(
  "/api/changeorderstatus",
  UserValidator.isAdmin,
  orderController.changOrderStatus
);
app.post("/api/cancelorder", orderController.cancelOrder);
app.listen(port, () => console.log(` app listening on port ${port}!`));
