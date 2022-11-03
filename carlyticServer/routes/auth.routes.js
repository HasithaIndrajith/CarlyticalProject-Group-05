var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");

router.get("/", function (req, res) {
  res.send("GET route on things.");
});
router.post("/", function (req, res) {
  res.send("POST route on things.");
});

router.post("/signin", controller.signin);
router.get("/logout", controller.logout);
router.post("/signup", controller.signup);
router.get("/refresh", controller.refreshTokenHandler);

module.exports = router;
