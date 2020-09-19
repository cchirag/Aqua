import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../Screens/DashboardScreen'
import GlobalStatsScreen  from  '../Screens/GlobalStatsScreen'

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name = 'Dashboard' component = {DashboardScreen} options = {{header: () => null}}></Stack.Screen>
            <Stack.Screen name = 'Global Stats' component = {GlobalStatsScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}