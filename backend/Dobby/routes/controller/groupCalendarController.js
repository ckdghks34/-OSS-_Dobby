const { async } = require("@firebase/util");
const { admin, adminauth, auth } = require("./../../firebase/fbconfig");


async function getGroup(req, res, next) {
    const uid = req.query.uid;

    const user = admin.collection("users").doc(uid).get();

    if (!user.empty) {
        const groupRef = admin.collectionGroup("members").where('uid', '==', uid);
        const group = await groupRef.get();
    
        if (!group.empty) {
          const groupList = [];
 
          group.forEach(async (doc) =>{
            console.log(doc.data().name);
            var temRef = admin.collection("groups").doc(doc.data().gid);
            var tem = await temRef.get();
            if(!tem.empty){
              console.log(tem.data().name);
              console.log(tem.data().gid);
              groupList.push({
                name: tem.data().name,
                gid: tem.data().gid,
              });
            }
          });      
          res.json({
            group: groupList,
            msg: "그룹 조회 성공",
          });
        } else {
          res.json({
            error: "그룹이 없습니다.",
          });
        }
      } else {
        res.status(401).json({
          msg: "등록된 회원 정보가 없습니다.",
        });
      }
}


async function getCalendar(req, res, next) {
    const gid = req.query.gid;

    const group = admin.collection("groups").doc(gid).get();

    if (!group.empty) {
        const calendarRef = admin.collection("group").doc(gid).collection("groupcalendar");
        const calendar = await calendarRef.get();
    
        if (!calendar.empty) {
          res.json({
            calendar: calendar.data(),
            msg: "그룹 캘린더 조회 성공",
          });
        } else {
          res.json({
            error: "그룹 캘린더가 없습니다.",
          });
        }
      } else {
        res.status(401).json({
          msg: "등록된 회원 정보가 없습니다.",
        });
      }
}


async function createCalendar(req, res, next) {
  const gid = req.body.gid;
  const uid = req.body.uid;
  const time = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");

  const memberRef = admin.collection("groups").doc(gid).collection("members");
  const member = await memberRef.get();

  if (!group.empty) {
    const calendarRef = admin.collection("groups").doc(gid).collection("groupcalendar");
    var arr = new Array.form({length : member.data().length}, () => false);
    const memberList = [];
    member.forEach((doc) => {
      memberList.push({
        uid: doc.id,
        email: doc.data().email,
        name: doc.data().name,
      });
    });
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
      participant: memberList,
      completed: arr,
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
              msg: "그룹 일정 생성 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "그룹 일정 생성 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "그룹 정보가 없습니다.",
    });
  }
}


async function updateCalendar(req, res, next) {
  const gid = req.body.gid;
  const uid = req.body.uid;
  const cid = req.body.cid;
  const time = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  const calendarRef = admin.collection("groups").doc(gid).collection("groupcalendar");
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
      color: req.body.color,
      participant: req.body.participant,
      completed: req.body.completed,
      creator: uid,
      createdAt: time,
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
              msg: "그룹 일정 수정 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "그룹 일정 수정 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "그룹 일정 정보가 없습니다.",
    });
  }
}


async function deleteCalendar(req, res, next) {
  const gid = req.body.gid;
  const cid = req.body.cid;
  const uid = req.body.uid;

  const calendarRef = admin.collection("groups").doc(gid).collection("groupcalendar");
  const calendar = await calendarRef.doc(cid).get();

  if (!calendar.empty) {
    if(calendar.data().uid == uid){
      calendarRef
        .doc(cid)
        .delete()
        .then(() => {
          res.json({
            msg: "그룹 일정 삭제 성공",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({
            msg: "그룹 일정 삭제 실패",
          });
        });
    }
    else{
      res.status(401).json({
        msg: "그룹 일정은 생성자만 삭제할 수 있습니다.",
      });
    }
  } else {
    res.status(401).json({
      msg: "그룹 일정 정보가 없습니다.",
    });
  }
}


async function checkCalendar(req, res, next) {
  const gid = req.body.gid;
  const uid = req.body.uid;
  const cid = req.body.cid;

  const calendarRef = admin.collection("groups").doc(gid).collection("groupcalendar");
  const calendar = await calendarRef.doc(cid).get();

  var value;
  for(var i = 0; i < calendar.data().participant.length; i++)
  {
    if(calendar.data().participant[i] == uid)
    {
      if(calendar.data().completed[i]){
        value = false;
      }
      else{
        value = true;
      }
    }
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
              msg: "그룹 일정 완료여부 변경 성공",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          msg: "그룹 일정 완료여부 변경 실패",
        });
      });
  } else {
    res.status(401).json({
      msg: "그룹 일정 정보가 없습니다.",
    });
  }
}


module.exports = {
  getGroup,
  getCalendar,
  createCalendar,
  updateCalendar,
  deleteCalendar,
  checkCalendar,
};