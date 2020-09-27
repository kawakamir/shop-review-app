import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

import {ShopDetail} from "../components/ShopDetail"
import {FloatingActionButton} from "../components/FloatingActionButton"

import {RootStackParamList} from "../types/navigation"

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Shop">
    route: RouteProp<RootStackParamList, "Shop">
}

export const ShopScreen: React.FC<Props> = ({ navigation, route}: Props) => {
    const {shop} = route.params;

    useEffect(() => {
        navigation.setOptions({ title: shop.name });
    }, [shop])

    return (
        <SafeAreaView style={styles.container}>
            <ShopDetail shop={shop} />
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
