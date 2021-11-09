var express = require("express");
var router = express.Router();

const userController = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/findID", userController.findID);
router.post("/findPW", userController.findPW);
router.put("/changePW", userController.changePW);
router.get("/checkDuplicateID", userController.checkDuplicateID);
router.get("/checkDuplicateNick", userController.checkDuplicateNickname);
router.get("/checkDuplicateEmail", userController.checkDuplicateEmail);
router.delete("/withdraw", userController.withdrawUser);
router.post("/logout", userController.authSignout);
router.get("/getUserInfo", userController.getUserInfo);
router.get("/checkSignupGoogle", userController.checkDataWithGoogle);

module.exports = router;
