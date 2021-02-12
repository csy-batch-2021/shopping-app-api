const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT | 3000;

app.get("/", (req, res) => res.send("REST API"));
app.listen(port, () => console.log(` app listening on port ${port}!`));
