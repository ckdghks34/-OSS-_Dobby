var express = require("express");
var router = express.Router();

const tokenController = require("./controller/tokenController");

router.post("/registerToken", tokenController.registerToken);

module.exports = router;