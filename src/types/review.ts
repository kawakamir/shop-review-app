import * as firebase from "firebase";


type UserRef = {
    id: string;
    name: string;
}

type ShopRef = {
    id: string;
    name: string;
}

export type Review = {
    id?: string;
    text: string;
    score: number;
    user: UserRef;
    shop: ShopRef;
    imageUrl: string;
    updatedAt: firebase.firestore.Timestamp;
    createdAt: firebase.firestore.Timestamp;
}
