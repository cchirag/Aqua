import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function ProfileScreen() {
  const [consumed, setConsumed] = useState(0);
  const [drops, setDrops] = useState(0);
  const [disName, setDisName] = useState('');
  var i = 0;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(() => {
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .onSnapshot((snapShot) => {
              if (isMounted) {
                setConsumed(snapShot.data().waterConsumed);
                setDrops(snapShot.data().walletBalance);
              }
            });
        });
    }

    let name = '';
    for (i = 0; i < auth().currentUser.displayName.length; i++) {
      if (auth().currentUser.displayName.charAt(i) === ' ') {
        name = name + `\n`;
      } else {
        name = name + auth().currentUser.displayName.charAt(i);
      }

      if (i === auth().currentUser.displayName.length - 1) {
        setDisName(name);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [disName]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={{uri: auth().currentUser.photoURL}}
        style={{height: 150, width: 150}}></Image>
      <View style = {{alignItems: 'center', marginVertical: 10}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{disName}</Text>
        <Text style={{fontSize: 18}}>{auth().currentUser.email}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
          justifyContent: 'space-between',
          marginVertical: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            height: 70,
            width: 120,
            justifyContent: 'space-around',
          }}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            {drops}
          </Text>
          <Fontisto name="blood-drop" color="white" size={50}></Fontisto>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            height: 70,
            width: 120,
            justifyContent: 'space-around',
          }}>
          <Fontisto name="qrcode" color="white" size={50}></Fontisto>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            {consumed}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => auth().signOut()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FF646A',
            height: 70,
            width: 120,
            justifyContent: 'space-around',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            SignOut
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
