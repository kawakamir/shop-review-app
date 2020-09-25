
import * as firebase from 'firebase';
import "firebase/firestore";
import { Shop } from '../types/shop';
import { 
  FB_API_KEY, 
  FB_AUTH_DOMAIN, 
  FB_DATABASE_URL, 
  FB_PROJECTID, 
  FB_STORAGE_BUCKET, 
  FB_MESSAGING_SENDER_ID, 
  FB_MESSAGE_APP_ID,
  FB_MEASUREMENT_ID,
} from "../../.env.json";

if (!firebase.apps.length){
  firebase.initializeApp({
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    databaseURL: FB_DATABASE_URL,
    projectId: FB_PROJECTID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_MESSAGE_APP_ID,
    measurementId: FB_MEASUREMENT_ID,
  });
}

export const getShops = async() => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map(doc => doc.data() as Shop);
    return shops
}
