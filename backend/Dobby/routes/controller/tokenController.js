const { async } = require("@firebase/util");
const { admin, adminauth, auth } = require("./../../firebase/fbconfig");
const Auth = require("./authController");

async function registerToken(req, res, next) {
    const valid = Auth.verifyToken(req.headers.authorization);
  
    if (valid) {
        const uid = req.body.uid;
        const fcm = req.body.token;
        const userRef = admin.collection("users").doc(uid);
        const user = await userRef.get();
        const tokenRef = admin.collection("users").doc(uid).collection("tokens");

        if(!user.empty){
            const list = {
                token: fcm,
            }
            const token = await tokenRef.add(list);
            tokenRef.doc(token.id)
            .update({tid: token.id})
            .then(() =>{
                tokenRef.doc(token.id)
                .get()
                .then((doc) => {
                    res.json({
                        token: doc.data(),
                        msg: "토큰 저장 성공",
                    });
                });
            })
            .catch((err) => {
                res.status(401).json({
                    msg: "토큰 저장 실패",
                });
            })
        }
        else{
            res.status(401).json({
                msg: "유저 정보가 없습니다.",
            });
        }
    }
    else{
        res.status(403).json({
            error: "Token is not vaild",
        });
    }
}

module.exports = {
    registerToken,
};