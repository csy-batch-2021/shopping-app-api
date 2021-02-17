const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Default");
  res.send("REST API- v2");
});
/*

*/
module.exports = router;
