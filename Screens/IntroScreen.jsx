import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Logo from '../assets/images/Logo.png';
import IonIcons from 'react-native-vector-icons/Ionicons';
import GestureDetector from 'react-native-gesture-detector';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

export default function IntroScreen({navigation}) {
  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          navigation.navigate("SignIn Screen")
        }
      }}>
      <View style={Styles.container}>
        <View style={Styles.logoContainer}>
          <Image source={Logo} style={Styles.logo} resizeMode="contain"></Image>
          <Text style={Styles.quote}>
            “All the water that will ever be is, right now.”{' '}
          </Text>
        </View>
        <View style={Styles.bottomContainer}>
          <IonIcons name="chevron-up-outline" size={40}></IonIcons>
          <Text style={Styles.swipeText}>Swipe up to Sign In</Text>
        </View>
      </View>
    </FlingGestureHandler>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF646A',
    justifyContent: 'space-between',
  },

  bottomContainer: {
    height: Dimensions.get('screen').height * 0.2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  quote: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
    padding: 15,
  },
  swipeText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
