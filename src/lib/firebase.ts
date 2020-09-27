import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import { Shop } from '../types/shop';
import { initialUser, User } from '../types/user';
const env = require("../../env.json")

if (!firebase.apps.length){
  firebase.initializeApp({
    apiKey: env.FB_API_KEY,
    authDomain: env.FB_AUTH_DOMAIN,
    databaseURL: env.FB_DATABASE_URL,
    projectId: env.FB_PROJECTID,
    storageBucket: env.FB_STORAGE_BUCKET,
    messagingSenderId: env.FB_MESSAGING_SENDER_ID,
    appId: env.FB_MESSAGE_APP_ID,
    measurementId: env.FB_MEASUREMENT_ID,
  });
}


export const getShops = async() => {
    const snapshot = await firebase.firestore().collection("shops").orderBy("score", "desc").get()
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    return shops
}

export const signin = async () => {
  const userCredintial = await firebase.auth().signInAnonymously();
  const { uid } = userCredintial.user;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists){
    await firebase.firestore().collection("users").doc(uid).set(initialUser)
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data()
    } as User;
  }
};
