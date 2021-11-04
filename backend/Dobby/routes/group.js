var express = require("express");
var router = express.Router();

const groupController = require("./controller/groupController");

router.get("/getAllgroups", groupController.getAllgroups);
router.get("/getGroup", groupController.getGroup);
router.post("/createGroup", groupController.createGroup);
router.put("/updateGroup", groupController.updateGroup);
router.delete("/deleteGroup", groupController.deleteGroup);
router.put("/changePrivate", groupController.changePrivate);
router.put("/addMember", groupController.addMember);

module.exports = router;
