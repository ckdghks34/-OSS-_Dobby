const { async } = require("@firebase/util");
const { firebase_admin, admin } = require("./../../firebase/fbconfig");

async function userPush(fcmtoken, uid, msg) {
  const token = fcmtoken;

  let message = {
    notification: {
      title: msg.title,
      body: msg.body,
    },
    token: token,
  };

  await firebase_admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log("Successfully sent message : ", res);
      return true;
    })
    .catch((err) => {
      console.log("Error Sending message! : ", err);
      return false;
    });
}

async function groupPush(gid, msg) {
  const tokenList = [];
  const memberRef = admin.collection("groups").doc(gid).collection("members");
  const member = await memberRef.get();

  new Promise(async (resolve, reject) => {
    for (let doc of member.docs) {
      var tokenRef = admin
        .collection("users")
        .doc(doc.data().uid)
        .collection("tokens");
      var token = await tokenRef.get();

      for (let docu of token.docs) {
        tokenList.push(docu.data().token);
      }
    }
    resolve();
  });

  let message = {
    notification: {
      title: msg.title,
      body: msg.body,
    },
    token: tokenList,
  };

  await firebase_admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log("Successfully sent message : ", res);
      return true;
    })
    .catch((err) => {
      console.log("Error Sending message! : ", err);
      return false;
    });
}

module.exports = {
  userPush,
  groupPush,
};
