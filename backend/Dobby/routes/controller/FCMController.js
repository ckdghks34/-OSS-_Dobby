const { async } = require("@firebase/util");
const { firebase_admin, admin } = require("./../../firebase/fbconfig");

async function userPush(fcmtoken, uid, msg) {
  const userRef = admin.collection("users").doc(uid).collection("tokens");
  const user = await userRef.get();

  if (user.empty) {
    console.log("No token found for user : ", uid);
    return false;
  } else {
    new Promise(async (resolve, reject) => {
      for (let doc of user.docs) {
        let message = {
          notification: {
            title: msg.title,
            body: msg.body,
          },
          token: doc.data().token,
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
    });
  }
}
async function groupPush(gid, msg) {
  const memberRef = admin.collection("groups").doc(gid).collection("members");
  const member = await memberRef.get();

  new Promise(async (resolve, reject) => {
    for (let doc of member.docs) {
      var tokenRef = admin.collection("users").doc(doc.data().uid).collection("tokens");
      var token = await tokenRef.get();

      for (let docu of token.docs) {
        let message = {
          notification: {
            title: msg.title,
            body: msg.body,
          },
          token: docu.data().token,
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
    }
    resolve();
  });
}

module.exports = {
  userPush,
  groupPush,
};
