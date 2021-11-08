const { adminauth } = require("./../../firebase/fbconfig");

async function verifyToken(reqtoken) {
  const token = reqtoken;
  let valid = false;
  await adminauth
    .verifyIdToken(token)
    .then(() => {
      console.log("Token is valid" + token);
      valid = true;
    })
    .catch(() => {
      console.log("Token is not valid : " + token);
      valid = false;
    });
  return valid;
}

module.exports = {
  verifyToken,
};
