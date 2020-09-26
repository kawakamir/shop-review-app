import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {HomeScreenNavigator} from "./HomeStackNavigator"

export const AppNavigator = () => {
    return (
    <NavigationContainer><HomeScreenNavigator /></NavigationContainer>
    )
}
