var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");

router.get("/", function (req, res) {
  res.send("GET route on things.");
});
router.post("/", function (req, res) {
  res.send("POST route on things.");
});

router.post("/signin",controller.signin)
module.exports = router;
