const { admin, adminauth, auth } = require("./../../firebase/fbconfig");

async function getUserCalendar(req, res, next) {
  const uid = req.body.uid;

  const user = admin.collection("users").doc(uid).get();

  if (!user.empty) {
    const calendarRef = admin.collection("users").doc(uid).collection("calendar");
    const calendar = await calendarRef.get();

    if (!calendar.empty) {
      const calendarData = calendar.docs.map((doc) => doc.data());
      res.status(200).json({
        id: calendarData.creator,
        calendar: calendarData,
      });
    } else {
      res.status(401).json({
        msg: "일정 정보가 없습니다.",
      });
    }
  } else {
    res.status(401).json({
      msg: "회원 정보가 없습니다.",
    });
  }
}

async function createCalendar(req, res, next) {
  const uid = req.body.uid;
  const time = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");

  const user = admin.collection("uesr").doc(uid).get();

  if (!user.empty) {
    const calendarRef = admin.collection("users").doc(uid).collection("calendar");

    const list = {
      title: req.body.title,
      content: req.body.content,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      placeName: req.body.placeName,
      placeLat: req.body.placeLat,
      placeLng: req.body.placeLng,
      allDay: req.body.allDay,
      color: req.body.color,
      completed: false,
      creator: uid,
      createdAt: time,
    };

    const calendar = await calendarRef.add(list);
    calendarRef
      .doc(calendar.id)
      .update({ cid: calendar.id })
      .then(() => {
        calendarRef
          .doc(calendar.id)
          .get()
          .then((doc) => {
            res.json({
              calendar: doc.data(),
              msg: "일정 생성 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "일정 생성 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "회원 정보가 없습니다.",
    });
  }
}

async function deleteUserCalendar(req, res, next) {
  const uid = req.body.uid;
  const cid = req.body.cid;

  const calendarRef = admin.collection("users").doc(uid).collection("calendar");
  const calendar = await calendarRef.doc(cid).get();

  if (!calendar.empty) {
    calendarRef
      .doc(cid)
      .delete()
      .then(() => {
        res.json({
          msg: "일정 삭제 성공",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "일정 삭제 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "일정 정보가 없습니다.",
    });
  }
}
async function updateUserCalendar(req, res, next) {
  const uid = req.body.uid;
  const cid = req.body.cid;
  const time = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  const calendarRef = admin.collection("users").doc(uid).collection("calendar");
  const calendar = await calendarRef.doc(cid).get();

  if (!calendar.empty) {
    const list = {
      title: req.body.title,
      content: req.body.content,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      placeName: req.body.placeName,
      placeLat: req.body.placeLat,
      placeLng: req.body.placeLng,
      allDay: req.body.allDay,
      completed: req.body.completed,
      timeStamp: time,
    };

    calendarRef
      .doc(cid)
      .update(list)
      .then(() => {
        calendarRef
          .doc(cid)
          .get()
          .then((doc) => {
            res.json({
              calendar: doc.data(),
              msg: "일정 수정 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "일정 수정 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "일정 정보가 없습니다.",
    });
  }
}

async function completeUserCalendar(req, res, next) {
  const uid = req.body.uid;
  const cid = req.body.cid;

  const calendarRef = admin.collection("users").doc(uid).collection("calendar");
  const calendar = await calendarRef.doc(cid).get();

  var value;
  if (calendar.data().completed) {
    value = false;
  } else {
    value = true;
  }

  if (!calendar.empty) {
    calendarRef
      .doc(cid)
      .update({ completed: value })
      .then(() => {
        calendarRef
          .doc(cid)
          .get()
          .then((doc) => {
            res.json({
              calendar: doc.data(),
              msg: "일정 완료여부 변경 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "일정 완료여부 변경 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "일정 정보가 없습니다.",
    });
  }
}

module.exports = {
  getUserCalendar,
  createCalendar,
  deleteUserCalendar,
  updateUserCalendar,
  completeUserCalendar,
};
