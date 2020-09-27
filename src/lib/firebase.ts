
import * as firebase from 'firebase';
import "firebase/firestore";
import { Shop } from '../types/shop';
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
