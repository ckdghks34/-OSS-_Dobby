const firebase_admin = require("firebase-admin");
const firebase = require("firebase/app");
const firebaseauth = require("firebase/auth");
const serviceAccount = require("./dobby-eba4c-firebase-adminsdk-voed8-afd1eeb458.json");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

firebase.initializeApp(firebaseConfig);
firebase_admin.initializeApp(
  { credential: firebase_admin.credential.cert(serviceAccount) },
  process.env.databaseURL,
  process.env.storageBucket
);

const admin = firebase_admin.firestore();
const adminauth = firebase_admin.auth();
const auth = firebaseauth.getAuth();

admin.settings({ ignoreUndefinedProperties: true });
module.exports = { admin, adminauth, auth, firebase_admin };
