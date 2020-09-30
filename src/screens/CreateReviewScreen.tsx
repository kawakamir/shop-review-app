import React, { useLayoutEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image } from "react-native";
import {UserContext} from "../contexts/userContext"
import {getExtention} from "../utils/file"
import * as firebase from 'firebase';
/* components */
import { IconButton } from "../components/IconButton";
import {TextArea} from "../components/TextArea"
import {StarInput} from "../components/StarInput"
import {Button} from "../components/Button"
/* types */
import {Review} from "../types/review";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { createReviewRef } from "../lib/firebase";
import {pickImage} from "../lib/image-picker"
import { ShopReviewItem } from "../components/ShopReviewItem";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("")
  const [imageUri, setImageUri] = useState<string>("")
  const [score, setScore] = useState<number>(3)

  const {user} = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    // documentのidを先に取得
    const reviewDocRef = await createReviewRef(shop.id)

    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`

    // 画像をstorageにアップロード

    // reviewドキュメントを作る

    const review = {
      user: {
        name: user?.name,
        id: user?.id
      },
      shop: {
        name: shop.name,
        id: shop.id
      },
      text,
      score,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review
    // await addReview(shop.id, review)
  }

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea value={text} onChangeText={(text) => setText(text)} label="レビュー" placeholder="レビューを書いてください" />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
      <Button text="レビューを投稿する" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  }
});
