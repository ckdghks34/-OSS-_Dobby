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

module.exports = {
  getAllgroups,
  getGroup,
  createGroup,
};
