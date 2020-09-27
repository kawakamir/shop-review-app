import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {MainTabNavigator} from "./MainTabNavigator"
import {AuthScreen} from "../screens/AuthScreen"

export const AppNavigator = () => {
    const user = null;

    return (
    <NavigationContainer>
        {!user? <AuthScreen /> :<MainTabNavigator /> }
    </NavigationContainer>
    );
};
