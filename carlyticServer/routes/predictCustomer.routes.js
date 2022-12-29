var express = require("express");
var router = express.Router();
const controller = require("../controllers/predictCustomer.controller");

router.post("/predictcustomer", controller.predictcustomer);

module.exports = router;
