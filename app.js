const { OrderController } = require("./order.controller");
const { ProductController } = require("./product.controller");
const { UserController } = require("./user.controller");
const { UserValidator } = require("./user.validator");

const express = require("express");
const router = express.Router();

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();

router.get("/", (req, res) => res.send("REST API- v2"));

// User Details
router.post("/userLogin", userController.loginUser);
router.post("/addUser", userController.newUserRegistration);
router.get("/UsersList", userController.getUsersList);
router.patch(
  "/changeUserStatus",
  UserValidator.isAdmin,
  userController.updateUserStatus
);

router.patch(
  "/addBalance",
  UserValidator.isAdmin,
  userController.updateBalance
);

// Products
router.get("/activeproducts", productController.getActiveProductsList);
router.post("/searchProducts", productController.searchProducts);
router.post("/addNewProducts", productController.addNewProducts);
router.get("/getOneProductDetail", productController.getOneProductDetails);
router.patch("/changeProductStatus", productController.changeProductStatus);
router.get("/getAllProducts", productController.getProducts);

// Orders
router.post("/addOrder", orderController.addOrder);
router.get("/myorders", orderController.myOrders);
router.get("/orders", orderController.allOrders);
router.post(
  "/changeorderstatus",
  UserValidator.isAdmin,
  orderController.changOrderStatus
);
router.post("/cancelorder", orderController.cancelOrder);

module.exports = router;
