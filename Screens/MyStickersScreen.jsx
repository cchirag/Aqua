import React, {Component, useState} from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  Switch,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function MyStickersScreen({navigation}) {
  const [flash, setFlash] = useState(false);

  const onSuccess = (e) => {
      let i = false;
    firestore()
      .collection('dispensers')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (e.data === doc.data().uid) {
              i = true;
            firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .get()
              .then((res) => {
                if (res.data().walletBalance <= 0) {
                  ToastAndroid.showWithGravity(
                    'Insufficient Balance.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  );
                  navigation.navigate('Wallet');
                } else {
                  ToastAndroid.showWithGravity(
                    'Please collect the Water.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  );
                  let walletBalance = 0;
                  let bottleSaved = 0;
                  let moneyDonated = 0;
                  let waterConsumed = 0;
                  firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .get()
                    .then((res) => {
                      walletBalance = res.data().walletBalance;
                      bottleSaved = res.data().bottleSaved;
                      moneyDonated = res.data().moneyDonated;
                      waterConsumed = res.data().waterConsumed;
                    })
                    .then(async () => {
                      await firestore()
                        .collection('users')
                        .doc(auth().currentUser.uid)
                        .update({
                          walletBalance: walletBalance - 1,
                          bottleSaved: bottleSaved + 1,
                          moneyDonated: moneyDonated + 0.6,
                          waterConsumed: waterConsumed + 1,
                        });
                    }).then(async() => {
                      await firestore().collection("dispensers").doc(e.data).update({
                        isActive: true
                      }).then(() => {
                        setTimeout(async() => {
                          await firestore().collection("dispensers").doc(e.data).update({
                            isActive: false
                          })
                        },2000)
                      })
                    })
                    .then(() => {
                      navigation.navigate('Home');
                    });
                }
              });
          }
        });
      }).finally(() => {
          if(i === false){
            ToastAndroid.showWithGravity(
                'Invalid QR',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
          }
      });
  };

  return (
    <QRCodeScanner
    reactivate = {true}
    reactivateTimeout = {3000}
      onRead={onSuccess}
      flashMode={
        flash
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Scan the QR</Text>
        </Text>
      }
      bottomContent={
        <View>
          <Switch
            trackColor={{false: '#000000', true: '#767577'}}
            thumbColor={flash ? '#FF646A' : '#f4f3f4'}
            onValueChange={() => setFlash(!flash)}
            value={flash}></Switch>
          <Text>Flash</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
