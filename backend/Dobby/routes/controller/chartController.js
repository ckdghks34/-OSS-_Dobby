const { async } = require("@firebase/util");
const { admin, adminauth, auth } = require("./../../firebase/fbconfig");
const Auth = require("./authController");

async function getPersonal(req, res, next) {
  const valid = Auth.verifyToken(req.headers.authorization);

  if (valid) {
    const uid = req.body.uid;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const calendarRef = admin
      .collection("users")
      .doc(uid)
      .collection("calendar");
    const calendar = await calendarRef.get();

    if (!calendar.empty) {
      var totalCategory = [];
      var checkCategory = [];
      var totalNum = 0;
      var checkNum = 0;
      new Promise(async (resolve, reject) => {
        for (let doc of calendar.docs) {
          if (
            doc.data().startDate >= startDate &&
            doc.data().endDate <= endDate
          ) {
            totalNum += 1;
            if (totalCategory.empty) {
              totalCategory.push({
                category: doc.category,
                Num: 1,
              });
            } else {
              let check = false;
              for (let docu of totalCategory) {
                if (docu.category == doc.category) {
                  docu.Num += 1;
                  check = true;
                  break;
                }
              }
              if (!check) {
                totalCategory.push({
                  category: doc.category,
                  Num: 1,
                });
              }
            }
            if (doc.data().completed == true) {
              checkNum += 1;
              if (checkCategory.empty) {
                checkCategory.push({
                  category: doc.category,
                  Num: 1,
                });
              } else {
                let check = false;
                for (let docu of checkCategory) {
                  if (docu.category == doc.category) {
                    docu.Num += 1;
                    check = true;
                    break;
                  }
                }
                if (!check) {
                  checkCategory.push({
                    category: doc.category,
                    Num: 1,
                  });
                }
              }
            }
          }
        }
        resolve();
      }).then(() => {
        res.json({
          totalNum: totalNum,
          totalCategory: totalCategory,
          checkNum: checkNum,
          checkCategory: checkCategory,
          msg: "개인 일정 차트 조회 성공",
        });
      });
    } else {
      res.status(401).json({
        msg: "등록된 일정 정보가 없습니다.",
      });
    }
  } else {
    res.status(403).json({
      error: "Token is not vaild",
    });
  }
}

async function getGroup(req, res, next) {
  const valid = Auth.verifyToken(req.headers.authorization);

  if (valid) {
      const uid = req.body.uid;
      const gid = req.body.gid;
      const 
  } else {
    res.status(403).json({
      error: "Token is not vaild",
    });
  }
}

module.exports = {
  getPersonal,
  getGroup,
};
