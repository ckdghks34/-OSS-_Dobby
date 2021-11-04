const { admin, adminauth, auth } = require("./../../firebase/fbconfig");


async function getGroup(req, res, next) {
    const uid = req.body.uid;

    const user = admin.collection("users").doc(uid).get();

    if (!user.empty) {
        const groupRef = admin.collection("users").doc(uid).collection("group");
        const group = await groupRef.get();
    
        if (!group.empty) {
          res.json({
            calendar: group.data(),
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
    const gid = req.body.gid;

    const group = admin.collection("users").doc(uid).get();

    if (!user.empty) {
        const groupRef = admin.collection("users").doc(uid).collection("group");
        const group = await groupRef.get();
    
        if (!group.empty) {
          res.json({
            calendar: group.data(),
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



module.exports = {
//   getGroup,
//   getCalendar,
// createCalendar,
// updateCalendar,
// deleteCalendar,
// checkCalendar,
};