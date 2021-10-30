var database = require("./../../firebase/fbconfig");
var bcrypt = require("bcrypt-nodejs");
const { query } = require("express");

const saltRounds = 10;

/**
 * 회원가입 필수 데이터 검사
 * @param {Object} data - Request User Data
 * @returns
 */
function checkValidJoinData(data) {
  var valid = true;

  Object.keys(data).forEach((value) => {
    if (value != "address") {
      if (data[value] == "") valid = false;
    }
  });

  return valid;
}

/**
 * 회원 비밀번호 Hasing
 * @param {String} data
 * @returns
 */
function hasingPassword(data) {
  var salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(data, salt);
}

/**
 * 회원가입
 */
async function signUp(req, res, next) {
  const docRef = database.collection("users");

  var salt = bcrypt.genSaltSync(saltRounds);
  var encodingPW = bcrypt.hashSync(req.body.password, salt);

  const data = req.body;

  if (checkValidJoinData(data)) {
    data.password = hasingPassword(data);
    await docRef.add(data);

    return res.json({
      msg: "회원가입 성공!",
      user: data,
      valid: true,
    });
  } else {
    return res.status(401).json({
      msg: "입력되지 않은 정보가 있습니다.",
      valid: false,
    });
  }
}

/**
 * 로그인
 */
async function login(req, res, next) {
  const docRef = database.collection("users");
  const querydata = await docRef.where("id", "==", req.body.id).get();

  if (querydata.empty) {
    return res.status(401).json({
      error: "가입된 아이디가 없습니다.",
    });
  } else {
    var data = [];

    querydata.forEach((doc) => {
      data = doc.data();
    });

    if (bcrypt.compareSync(req.body.password, data.password)) {
      return res.json({
        msg: "로그인 성공",
        data: data,
      });
    } else {
      return res.status(401).json({
        error: "비밀번호가 틀렸습니다.",
      });
    }
  }
}

/**
 * 아이디 찾기
 */
async function findID(req, res, next) {
  const docRef = database.collection("users");
  const querydata = await docRef.where("email", "==", req.body.email).get();

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
      id: data.id,
    });
  }
}

/**
 * 비밀번호 찾기
 */
async function findPW(req, res, next) {
  const docRef = database.collection("users");
  const querydata = await docRef
    .where("id", "==", req.body.id)
    .where("email", "==", req.body.email)
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
      id: data.id,
      vaild: true,
      email: data.email,
    });
  }
}

/**
 * 비민번호 변경
 */
async function changePW(req, res, next) {
  const docRef = database.collection("users");
  const querydata = await docRef.where("id", "==", req.body.id).get();

  var salt = bcrypt.genSaltSync(saltRounds);
  var pw = bcrypt.hashSync(req.body.password, salt);

  var uid = "";
  var data = [];
  querydata.forEach((doc) => {
    dataid = doc.id;
    data = doc.data();
  });

  data.password = pw;
  database.collection("users").doc(uid).set(data);

  return res.json({
    msg: "비밀번호가 변경 되었습니다.",
  });
}

/**
 * 아이디 중복 체크
 */
async function checkDuplicateID(req, res, next) {
  const docRef = database.collection("users");
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
  const docRef = database.collection("users");
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
  const docRef = database.collection("users");
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
  const docRef = database.collection("users");
  const querydata = await docRef.where("id", "==", req.body.id).get();

  if (querydata.empty) {
    return res.status(401).json({
      error: "등록된 회원 정보가 없습니다.",
      withdraw: false,
    });
  } else {
    var uid = "";

    querydata.forEach((doc) => {
      uid = doc.id;
    });

    docRef.doc(uid).delete();

    return res.json({
      msg: "회원 탈퇴 되었습니다.",
      withdraw: true,
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
};
