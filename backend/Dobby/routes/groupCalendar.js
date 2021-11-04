var express = require("express");
var router = express.Router();

<<<<<<< HEAD
const groupController = require("./controller/groupCalendarController");
=======
const groupCalendarController = require("./controller/groupCalendarController");
>>>>>>> Be

// router.get("/getAllgroups", groupController.getAllgroups);
// router.get("/getGroup", groupController.getGroup);
// router.post("/createGroup", groupController.createGroup);

<<<<<<< HEAD
=======
router.get("/getGroup", groupCalendarController.getGroup);
router.get("/getCalendar", groupCalendarController.getCalendar);
router.post("/createCalendar", groupCalendarController.createCalendar);
router.put("/updateCalendar", groupCalendarController.updateCalendar);
router.delete("/deleteCalendar", groupCalendarController.deleteCalendar);
router.put("/checkCalendar", groupCalendarController.checkCalendar);


>>>>>>> Be
module.exports = router;