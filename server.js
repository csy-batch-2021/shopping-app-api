const express = require("express");
const cors = require("cors");
require("dotenv-flow").config();

const app = express();
app.use(express.json());
app.use(cors());
// Create Routes
const apiRoutes = require("./app");
app.get("/", apiRoutes);

const port = process.env.PORT || 3000;
console.log(process.env.DB_HOST);
app.listen(port, () => console.log(` app listening on port ${port}!`));
