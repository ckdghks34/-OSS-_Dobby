var express = require("express");
var router = express.Router();

const groupController = require("./controller/groupController");

router.get("/getAllgroups", groupController.getAllgroups);
router.get("/getGroup", groupController.getGroup);
module.exports = router;
