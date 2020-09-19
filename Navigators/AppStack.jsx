import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreen from '../Screens/IntroScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import AppBottomTab from './AppBottomTab';
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Intro Screen"
        component={IntroScreen}
        options={{header: () => null}}></Stack.Screen>
      <Stack.Screen
        name="SignIn Screen"
        component={SignInScreen}
        options={{header: () => null}}></Stack.Screen>
      <Stack.Screen
        name="SignUp Screen"
        component={SignUpScreen}
        options={{header: () => null}}></Stack.Screen>
    </Stack.Navigator>
  );
}
