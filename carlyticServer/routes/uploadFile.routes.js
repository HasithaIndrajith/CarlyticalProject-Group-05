var express = require("express");
var router = express.Router();
const controller = require("../controllers/uploadFile.controller");


router.post("/predictcustomerset", controller.predictcustomerset);
router.post("/predictcustomer", controller.predictcustomer);

module.exports = router;
