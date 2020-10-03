import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import {ReviewItem} from "../components/ReviewItem"

import {ShopDetail} from "../components/ShopDetail"
import {FloatingActionButton} from "../components/FloatingActionButton"

import {RootStackParamList} from "../types/navigation"
import { Review } from "../types/review";
import { getReviews } from "../lib/firebase";
import { FlatList } from "react-native-gesture-handler";

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Shop">
    route: RouteProp<RootStackParamList, "Shop">
}

export const ShopScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    const {shop} = route.params;
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        navigation.setOptions({ title: shop.name });

        const fetchReviews = async () => {
            const reviews = await getReviews(shop.id);
            setReviews(reviews);
        }
        fetchReviews()
    }, [shop])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            ListHeaderComponent={<ShopDetail shop={shop} />}
             data={reviews}
             renderItem={(({item}) => <ReviewItem review={item} />)}
             keyExtractor={(item) => item.id}
            />
            <FloatingActionButton
                iconName="plus"
                onPress={() => navigation.navigate("CreateReview", {shop})}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
});
