const { async } = require("@firebase/util");
const { admin, adminauth, auth } = require("./../../firebase/fbconfig");
const Auth = require("./authController");

async function getPersonal(req, res, next) {
    const valid = Auth.verifyToken(req.headers.authorization);
    
    if(valid) {
        const uid = req.body.uid;
        const calendarRef = admin.collection("users").doc(uid).collection("calendar");
        const calendar = await calendarRef.get();

        if(!calendar.empty) {
            const totalCategory = [];
            const checkCategory = [];
            var totalNum = 0;
            var checkNum = 0;
            new Promise(async (resolve, reject) =>{
                for(let doc of calendar.docs) {
                    
                }
                
                resolve();
            }) .then(() => {
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
    
    if(valid) {

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
  