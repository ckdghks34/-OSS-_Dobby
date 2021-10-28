const admin = require("firebase-admin");

const serviceAccount = require("./dobby-1c071-firebase-adminsdk-bfmst-7a00fcf92e.json");

const firebaseConfig = {
  // apiKey: "AIzaSyCdGn3Zl8JA9rkO5nHVW05pnWlVyG5nM64",
  // authDomain: "dobby-1c071.firebaseapp.com",
  // projectId: "dobby-1c071",
  // storageBucket: "dobby-1c071.appspot.com",
  // messagingSenderId: "317541903976",
  // appId: "1:317541903976:web:9d627cf0c6c909524a55dd",
  // measurementId: "G-6TZ41VKCX1",
  // databaseURL: "https://dobby-1c071.firebaseio.com",
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
  databaseURL: process.env.databaseURL,
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseConfig);
const database = admin.firestore();

module.exports = database;
