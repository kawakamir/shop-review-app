import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import { Review } from '../types/review';
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
    const shops = snapshot.docs.map(doc => ({...doc.data(), id: doc.id} as Shop));
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

export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
}

export const createReviewRef = async (shopId: string) => {
  return await firebase
  .firestore()
  .collection("shops")
  .doc(shopId)
  .collection("reviews")
  .doc()
};

export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri)
  const blob = await localUri.blob()
  // storageにupload
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL()
  } catch(err) {
    console.log(err);
  }
  return downloadUrl
}
