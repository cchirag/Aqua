import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileScreen from '../Screens/ProfileScreen';
import BuyWaterScreen from '../Screens/BuyWaterScreen';
import MyStickersScreen from '../Screens/MyStickersScreen';
import WalletScreen from '../Screens/WalletScreen';

import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BottomTab = createBottomTabNavigator();

export default function AppBottomTab() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#FF646A',
        inactiveTintColor: '#000000'
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
            tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => {
            return <Entypo name="home" size={size} color={color}></Entypo>;
          },
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => {
            return <Entypo name="user" size={size} color={color}></Entypo>;
          },
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Stickers"
        component={MyStickersScreen}
        options={{
            tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => {
            return <Fontisto name="qrcode" size={size} color={color}></Fontisto>;
          },
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
            tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => {
            return <Entypo name="wallet" size={size} color={color}></Entypo>;
          },
        }}></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
