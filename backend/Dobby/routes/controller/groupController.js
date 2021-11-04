const { admin, adminauth, auth } = require("./../../firebase/fbconfig");

async function getAllgroups(req, res, next) {
  const groupsRef = await admin.collection("groups");
  const groups = await groupsRef.get();

  if (groups.empty) {
    return res.status(401).json({
      message: "생성된 그룹이 없습니다.",
    });
  } else {
    const groupsList = [];
    groups.forEach((doc) => {
      groupsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return res.status(200).json({
      message: "그룹 조회 성공",
      groups: groupsList,
    });
  }
}

async function getGroup(req, res, next) {
  const gid = req.params.gid;
  const groupsRef = await admin.collection("groups").doc(gid);
  const group = await groupsRef.get();

  if (!group.empty) {
    res.json({
      group: group.data(),
      msg: "그룹 조회 성공",
    });
  } else {
    return res.status(401).json({
      message: "존재하지 않는 그룹입니다.",
    });
  }
}

async function createGroup(req, res, next) {
  const time = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");

  const groupRef = admin.collection("groups");
  const group = await groupRef.add({
    name: req.body.name,
    description: req.body.description,
    members: req.body.members,
    private: false,
    createdAt: time,
  });

  groupRef
    .doc(group.id)
    .update({ gid: group.id })
    .then(() => {
      groupRef
        .doc(group.id)
        .get()
        .then((doc) => {
          res.json({
            group: doc.data(),
            msg: "그룹 생성 성공",
          });
        });
    });
}
async function updateGroup(req, res, next) {
  const gid = req.body.gid;
  const groupRef = admin.collection("groups").doc(gid);
  const group = await groupRef.get();

  if (group.empty) {
    return res.status(401).json({
      message: "존재하지 않는 그룹입니다.",
    });
  } else {
    await groupRef
      .update({
        name: req.body.name,
        description: req.body.description,
        members: req.body.members,
        private: req.body.private,
      })
      .then(() => {
        console.log("Group updated successfully for group: " + gid);
        return res.status(200).json({
          message: "그룹 정보 수정 성공",
        });
      })
      .catch((error) => {
        console.log("Error updating group : ", error);
        return res.status(401).json({
          message: "그룹 정보 수정 실패",
        });
      });
  }
}

async function deleteGroup(req, res, next) {
  const gid = req.body.gid;
  const groupRef = admin.collection("groups").doc(gid);
  const group = await groupRef.get();

  if (group.empty) {
    return res.status(401).json({
      message: "존재하지 않는 그룹입니다.",
    });
  } else {
    await groupRef
      .delete()
      .then(() => {
        console.log("Group deleted successfully for group: " + gid);
        return res.status(200).json({
          message: "그룹 삭제 성공",
        });
      })
      .catch((error) => {
        console.log("Error deleting group : ", error);
        return res.status(401).json({
          message: "그룹 삭제 실패",
        });
      });
  }
}
async function changePrivate(req, res, next) {
  const gid = req.body.gid;
  const groupRef = admin.collection("groups").doc(gid);
  const group = await groupRef.get();

  if (group.empty) {
    return res.status(401).json({
      message: "존재하지 않는 그룹입니다.",
    });
  } else {
    await groupRef
      .update({
        private: req.body.private,
      })
      .then(() => {
        console.log("Group updated successfully for group: " + gid);
        return res.status(200).json({
          message: "그룹 정보 수정 성공",
        });
      })
      .catch((error) => {
        console.log("Error updating group : ", error);
        return res.status(401).json({
          message: "그룹 정보 수정 실패",
        });
      });
  }
}
async function addMember(req, res, next) {
  const gid = req.body.gid;
  const groupRef = admin.collection("groups").doc(gid);
  const group = await groupRef.get();

<<<<<<< HEAD
  const list = [];
=======
>>>>>>> Be
  if (group.empty) {
    return res.status(401).json({
      message: "존재하지 않는 그룹입니다.",
    });
  } else {
<<<<<<< HEAD
=======
    await groupRef
      .update({
        members: admin.firestore.FieldValue.arrayUnion(req.body.member),
      })
      .then(() => {
        console.log("Group updated successfully for group: " + gid);
        return res.status(200).json({
          message: "그룹 정보 수정 성공",
        });
      })
      .catch((error) => {
        console.log("Error updating group : ", error);
        return res.status(401).json({
          message: "그룹 정보 수정 실패",
        });
      });
>>>>>>> Be
  }
}

module.exports = {
  getAllgroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  changePrivate,
  addMember,
};
