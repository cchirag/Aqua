import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack';
import ProfileScreen from '../Screens/ProfileScreen'
import BuyWaterScreen from '../Screens/BuyWaterScreen'
import MyStickersScreen from '../Screens/MyStickersScreen'
import WalletScreen from '../Screens/WalletScreen'

const BottomTab = createBottomTabNavigator();

export default function AppBottomTab(){
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name = 'Home' component = {HomeStack}></BottomTab.Screen>
            <BottomTab.Screen name = 'Profile' component = {ProfileScreen}></BottomTab.Screen>
            <BottomTab.Screen name = 'Buy' component = {BuyWaterScreen}></BottomTab.Screen>
            <BottomTab.Screen name = 'Stickers' component = {MyStickersScreen}></BottomTab.Screen>
            <BottomTab.Screen name = 'Wallet' component = {WalletScreen}></BottomTab.Screen>
        </BottomTab.Navigator>
    )
} 