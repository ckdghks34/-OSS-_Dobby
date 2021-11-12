const { firebase_admin } = require("./../../firebase/fbconfig");

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

module.exports = {
  userPush,
};
