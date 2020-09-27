import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather} from "@expo/vector-icons"

import {HomeScreenNavigator} from "./HomeStackNavigator";
import {UserScreen} from "../screens/UserScreen";
import { color } from "react-native-reanimated";

const Tab = createBottomTabNavigator()

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            activeTintColor: "#900",
            inactiveTintColor: "999",
        }}
        >
            <Tab.Screen 
            name="Home" 
            component={HomeScreenNavigator}
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size}) => (
                    <Feather name="home" color={color} size={size} />
                )
            }}
             />
            <Tab.Screen 
            name="User" 
            component={UserScreen}
            options={{
                tabBarLabel: "User",
                tabBarIcon: ({ color, size}) => (
                    <Feather name="user" color={color} size={size} />
                )
            }}
             />
        </Tab.Navigator>
    )
}