const express = require("express");
const { ProductController } = require("./product.controller");
const { UserController } = require("./user.controller");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const userController = new UserController();
const productController = new ProductController();
app.get("/", (req, res) => res.send("REST API- v2"));
app.post("/userLogin", userController.loginUser);
app.post("/addUser", userController.newUserRegistration);
app.get("/activeproducts", productController.getActiveProductsList);
app.listen(port, () => console.log(` app listening on port ${port}!`));
