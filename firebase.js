// import firebase from 'firebase';
// 
// const firebaseConfig = {
//   apiKey: process.env.AMAZON_APP_FIREBASE_API_KEY,
//   authDomain: process.env.AMAZON_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.AMAZON_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.AMAZON_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.AMAZON_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.AMAZON_APP_FIREBASE_APP_ID
// };
// 
// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
// 
// const db = app.firestore();
// 
// export default db;
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.AMAZON_APP_FIREBASE_API_KEY,
  authDomain: process.env.AMAZON_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.AMAZON_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.AMAZON_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.AMAZON_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.AMAZON_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };