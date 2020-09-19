import React from 'react'
import {View,Text, StyleSheet, Dimensions} from 'react-native'

export default function IntroScreen(){
    return(
        <View style = {Styles.container}>
            <Text>Hello</Text>
            <View></View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF646A'
    },

    bottomContainer: {
        height: Dimensions.get("screen").height * 
    }
})