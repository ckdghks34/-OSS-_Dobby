const { admin, adminauth, auth } = require("./../../firebase/fbconfig");
const { signInWithEmailAndPassword } = require("firebase/auth");

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
      const doc = await admin.collection("users").doc(uid).get();

      const user = doc.data();
      console.log("로그인 성공");
      return res.json({
        msg: "성공",
        user: user,
        token: userCredential.user.stsTokenManager,
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
  const querydata = await docRef.where("nickname", "==", req.query.nickname).get();

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
  const uid = req.body.uid;
  adminauth
    .deleteUser(uid)
    .then(() => {
      const userCalendarRef = admin.collection("users").doc(uid).collection("calendar");
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
}

async function authSignout(req, res, next) {
  var idToken = req.body.idToken;
  adminauth.verifyIdToken(idToken).then((decodedToken) => {
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
  });
}

async function getUserInfo(req, res, next) {
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
};
