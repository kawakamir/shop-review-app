import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {MainTabNavigator} from "./MainTabNavigator"

export const AppNavigator = () => {
    return (
    <NavigationContainer><MainTabNavigator /></NavigationContainer>
    )
}
