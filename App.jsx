import {NavigationContainer} from '@react-navigation/native';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppBottomTab from './Navigators/AppBottomTab';
import AppStack from './Navigators/AppStack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(async (user) => {
      if (user !== null) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              setIsLoggedIn(true);
            } else {
              console.log('Nothing Exists');
            }
          });
      } else {
        setIsLoggedIn(false);
      }
    });
    return subscribe;
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppBottomTab></AppBottomTab> : <AppStack></AppStack>}
    </NavigationContainer>
  );
}

export default App;
