// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import firebaseConfig from "./../firebaseConfig";

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp(firebaseConfig);

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// import firebaseConfig from "../firebaseConfig";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDqARHqN5dQAk_JKYCvRlO6O7VyWzZQb0w",
  authDomain: "dobby-eba4c.firebaseapp.com",
  projectId: "dobby-eba4c",
  storageBucket: "dobby-eba4c.appspot.com",
  messagingSenderId: "185760420823",
  appId: "1:185760420823:web:8fa5c8b47f5c1dbbcfb192",
  measurementId: "G-VEVJDN7LYX",
  databaseURL: "https://dobby-eba4c.firbaseio.com",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log("Recevied Background Message : " + payload);

  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
