const { admin, adminauth, auth } = require("./../../firebase/fbconfig");
const { signInWithEmailAndPassword } = require("firebase/auth");

const Auth = require("./authController");
const { query } = require("express");
/**
 * 회원가입
 */
async function signUp(req, res, next) {
  var phone = "+82" + req.body.phone.substring(1);
  adminauth
    .createUser({
      email: req.body.email,
      phoneNumber: phone,
      password: req.body.password,
      displayName: req.body.name,
    })
    .then((user) => {
      const data = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        nickname: req.body.nickname,
        address: req.body.address,
        phone: user.phoneNumber,
      };

      const docRef = admin.collection("users").doc(user.uid);
      docRef.set(data);

      console.log("회원가입 성공");
      return res.json({
        msg: "회원가입 성공!",
        user: data,
        valid: true,
      });
    })
    .catch((error) => {
      console.log("회원가입 실패");
      console.log("Error creating new user : ", error);
      return res.status(401).json({
        msg: "가입에 문제가 발생하였습니다.",
      });
    });
}

/**
 * 로그인
 */
async function login(req, res, next) {
  console.log(req.body.email);
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async (userCredential) => {
      const uid = userCredential.user.uid;
      const users = await admin.collection("users").doc(uid).get();
      const fcm = req.headers.fcmtoken;
      console.log(fcm);
      const tokenRef = admin.collection("users").doc(uid).collection("tokens");
      const tokens = await tokenRef.get();
      var check = false;
      var tokenMessage = "";
      new Promise((resolve, reject) => {
        if (!tokens.empty) {
          console.log("token collection not empty");
          for (let docu of tokens.docs) {
            if (docu.data().token == fcm) {
              check = true;
              break;
            }
          }
        }
        if (!check) {
          console.log("저장된 토큰이 없어요");
          const list = {
            token: fcm,
          };
          const token = await tokenRef.add(list);
          tokenRef
            .doc(token.id)
            .update({ tid: token.id })
            .then(() => {
              tokenRef
                .doc(token.id)
                .get()
                .then(() => {
                  tokenMessage = "FCM 토큰 저장 성공";
                });
            })
            .catch(() => {
              tokenMessage = "FCM 토큰 저장 실패";
            });
        } else {
          console.log("저장된 토큰이 있어요");
          tokenMessage = "토큰이 이미 저장되어 있습니다.";
        }
        resolve();
      }).then(() => {
        const user = users.data();
        console.log("로그인 성공");
        return res.json({
          msg: "성공",
          user: user,
          token: userCredential.user.stsTokenManager,
          tokenMessage: tokenMessage,
        });
      });
    })
    .catch((error) => {
      console.log("login error : " + error);

      return res.status(401).json({
        error: "로그인 실패",
      });
    });
}

/**
 * 아이디 찾기
 */
async function findID(req, res, next) {
  var phone = "+82" + req.body.phone.substring(1);
  const docRef = admin.collection("users");
  const querydata = await docRef
    .where("name", "==", req.body.name)
    .where("phone", "==", phone)
    .get();

  if (querydata.empty) {
    return res.status(401).json({
      error: "등록된 아이디가 없습니다.",
    });
  } else {
    var data = [];

    querydata.forEach((doc) => {
      data = doc.data();
    });

    return res.json({
      id: data.email,
    });
  }
}

/**
 * 비밀번호 찾기
 */
async function findPW(req, res, next) {
  var phone = "+82" + req.body.phone.substring(1);
  const docRef = admin.collection("users");
  const querydata = await docRef
    .where("email", "==", req.body.email)
    .where("phone", "==", phone)
    .get();

  if (querydata.empty) {
    return res.status(401).json({
      error: "등록된 회원 정보가 없습니다.",
      valid: false,
    });
  } else {
    var data = [];

    querydata.forEach((doc) => {
      data = doc.data();
    });

    return res.json({
      email: data.email,
      valid: true,
    });
  }
}

/**
 * 비민번호 변경
 */
async function changePW(req, res, next) {
  const userRef = admin.collection("users");
  const querydata = await userRef.where("email", "==", req.body.email).get();

  if (querydata.empty) {
    return res.status(401).json({
      error: "등록된 회원 정보가 없습니다.",
    });
  } else {
    const user = querydata.docs[0].data();

    adminauth
      .updateUser(user.uid, {
        password: req.body.password,
      })
      .then(() => {
        console.log("Password updated successfully for user: " + user.uid);
        return res.json({
          msg: "비밀번호가 변경 되었습니다.",
          valid: true,
        });
      })
      .catch((error) => {
        console.log("Error updating password : ", error);
        return res.status(401).json({
          error: "비밀번호 변경 실패",
          valid: false,
        });
      });
  }
}

/**
 * 아이디 중복 체크
 */
async function checkDuplicateID(req, res, next) {
  const docRef = admin.collection("users");
  const querydata = await docRef.where("id", "==", req.query.id).get();

  if (querydata.empty) {
    return res.json({
      msg: "사용 가능한 아이디 입니다.",
      valid: true,
    });
  } else {
    return res.json({
      msg: "이미 등록된 아이디 입니다.",
      valid: false,
    });
  }
}

/**
 * 닉네임 중복 체크
 */
async function checkDuplicateNickname(req, res, next) {
  const docRef = admin.collection("users");
  const querydata = await docRef
    .where("nickname", "==", req.query.nickname)
    .get();

  if (querydata.empty) {
    return res.json({
      msg: "사용가능한 닉네임 입니다.",
      valid: true,
    });
  } else {
    return res.json({
      msg: "이미 등록된 닉네임 입니다.",
      valid: false,
    });
  }
}

/**
 * 이메일 중복 체크
 */
async function checkDuplicateEmail(req, res, next) {
  const docRef = admin.collection("users");
  const querydata = await docRef.where("email", "==", req.query.email).get();

  if (querydata.empty) {
    return res.json({
      msg: "사용 가능한 이메일 입니다.",
      valid: true,
    });
  } else {
    return res.json({
      msg: "이미 등록된 이메일 입니다.",
      valid: false,
    });
  }
}

/**
 * 회원탈퇴
 */
async function withdrawUser(req, res, next) {
  const valid = Auth.verifyToken(req.headers.authorization);

  if (valid) {
    const uid = req.body.uid;
    adminauth
      .deleteUser(uid)
      .then(() => {
        const userCalendarRef = admin
          .collection("users")
          .doc(uid)
          .collection("calendar");
        const userCalendar = userCalendarRef.get();

        if (!userCalendar.empty) {
          userCalendar.forEach((doc) => {
            userCalendarRef.doc(doc.id).delete();
          });
        }

        admin.collection("users").doc(uid).delete();

        console.log("회원 탈퇴 성공!");
        return res.json({
          msg: "회원 탈퇴 되었습니다.",
          withdraw: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({
          msg: "등록된 회원정보가 없습니다.",
          withdraw: false,
        });
      });
  } else {
    res.status(403).json({
      error: "Token is not vaild",
    });
  }
}

async function authSignout(req, res, next) {
  var idToken = req.body.idToken;
  adminauth
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("uid : " + uid);
      adminauth
        .revokeRefreshTokens(uid)
        .then((revokeRes) => {
          console.log("토큰 리브 성공");
          console.log(revokeRes);
          return res.json({
            msg: "로그아웃 성공!",
            valid: true,
          });
        })
        .catch((error) => {
          console.log("토큰 리브 실패");
          console.log(error);
          return res.status(401).json({
            msg: "로그아웃 실패!",
            valid: false,
          });
        });
    })
    .catch((error) => {
      console.log("Firebase Id token has expired");
      res.status(403).json({
        error: "Id token has expired",
      });
    });
}

async function getUserInfo(req, res, next) {
  const valid = Auth.verifyToken(req.headers.authorization);

  if (valid) {
    const uid = req.query.uid;

    const docRef = admin.collection("users").doc(uid);
    const user = await docRef.get();

    if (user.empty) {
      return res.status(401).json({
        error: "등록된 회원 정보가 없습니다.",
      });
    } else {
      const userdata = user.data();

      return res.json({
        user: userdata,
        valid: true,
      });
    }
  } else {
    res.status(403).json({
      error: "Token is not vaild",
    });
  }
}

async function checkUserWithProvider(req, res, next) {
  const uid = req.body.uid;

  const userRef = admin.collection("users").doc(uid);
  const user = await userRef.get();
  const fcm = req.headers.FCMtoken;
  const tokenRef = admin.collection("users").doc(uid).collection("tokens");
  const tokens = await tokenRef.get();
  var check = false;
  var tokenMessage = "";

  if (!user.exists) {
    adminauth
      .getUser(uid)
      .then(async (userRecord) => {
        await admin
          .collection("users")
          .doc(uid)
          .set({
            uid: uid,
            email: userRecord.email,
            name: userRecord.displayName,
            nickname: userRecord.email,
            phone: "",
            address: "",
          })
          .then(async (user) => {
            for (let docu of tokens.docs) {
              if (docu.data().token == fcm) {
                check = true;
                break;
              }
            }
            if (!check) {
              const list = {
                token: fcm,
              };
              const token = await tokenRef.add(list);
              tokenRef
                .doc(token.id)
                .update({ tid: token.id })
                .then(() => {
                  tokenRef
                    .doc(token.id)
                    .get()
                    .then(() => {
                      tokenMessage = "FCM 토큰 저장 성공";
                    });
                })
                .catch(() => {
                  tokenMessage = "FCM 토큰 저장 실패";
                });
            } else {
              tokenMessage = "토큰이 이미 저장되어 있습니다.";
            }
            return res.json({
              msg: "회원 등록이 완료되었습니다.",
              user: user,
              tokenMessage: tokenMessage,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(203).json({
          error: "이미 등록된 회원입니다.",
        });
      });
  } else {
    console.log("firestore에 이미 저장되어있습니다.");
    res.status(203).json({
      msg: "이미 등록된 회원입니다.",
    });
  }
}

module.exports = {
  signUp,
  login,
  findID,
  findPW,
  changePW,
  checkDuplicateEmail,
  checkDuplicateID,
  checkDuplicateNickname,
  withdrawUser,
  authSignout,
  getUserInfo,
  checkUserWithProvider,
};
