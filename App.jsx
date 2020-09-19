import { NavigationContainer } from '@react-navigation/native';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

function App() {
  return (
    <NavigationContainer>
          <AppStack></AppStack>
    </NavigationContainer>
  );
}

export default App;
