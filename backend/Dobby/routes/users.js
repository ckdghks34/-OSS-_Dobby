var express = require("express");
var router = express.Router();

const userControllder = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", userControllder.signUp);
router.post("/login", userControllder.login);
router.post("/findID", userControllder.findID);
router.post("/findPW", userControllder.findPW);
router.post("/changePW", userControllder.changePW);
router.get("/checkDuplicateID", userControllder.checkDuplicateID);
router.get("/checkDuplicateNick", userControllder.checkDuplicateNickname);
router.get("/checkDuplicateEmail", userControllder.checkDuplicateEmail);
router.delete("/withdraw", userControllder.withdrawUser);
module.exports = router;
