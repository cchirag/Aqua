import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CampaignBannerComponent from '../Components/CampaignBannerComponent';

const banners = [
  {
    key: 1,
    url:
      'https://www.netclipart.com/pp/m/11-112778_save-water-poster-poster-on-water-conservation-day.png',
  },
  {
    key: 2,
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyzwvmkfRdC2c-IvlgOM_eFkQvulSrUnbAng&usqp=CAU',
  },
  {
    key: 3,
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6AikoRUiF1_iScp9FAwykNekjFpAqenvp2w&usqp=CAU',
  },
];

export default function DashboardScreen({navigation}) {
  const [drops, setDrops] = useState();
  const [greetingText, setGreetingText] = useState('');
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [moneyDonated, setMoneyDonated] = useState(0);
  const [bottleSaved, setBottleSaved] = useState(0);
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
            .onSnapshot((snapshot) => {
              if (isMounted) {
                setDrops(snapshot.data().walletBalance);
                setWaterConsumed(snapshot.data().waterConsumed);
                setMoneyDonated(snapshot.data().moneyDonated);
                setBottleSaved(snapshot.data().bottleSaved);
              }
            });
        });
    }
    fetchData();
    let date = new Date();
    let hrs = date.getHours();
    if (hrs < 12) setGreetingText('Good Morning');
    else if (hrs >= 12 && hrs <= 17) setGreetingText('Good Afternoon,');
    else if (hrs >= 17 && hrs <= 24) setGreetingText('Good Evening,');

    return () => { isMounted = false }
  }, []);
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={Styles.headerContainer}>
        <View style={Styles.dropsContainer}>
          <Fontisto name="blood-drop" size={30} color="#00DDFF"></Fontisto>
          <Text style={Styles.dropText}>{drops}</Text>
        </View>
        <View style={Styles.mapContainer}>
          <Fontisto name="map-marker-alt" size={30} color="#FF646A"></Fontisto>
        </View>
      </View>
      <Text style={Styles.greetingText}>{greetingText}</Text>
      <Text style={Styles.nameText}>{auth().currentUser.displayName}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <View style={Styles.link}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            Profile
          </Text>
          <MaterialIcons name="navigate-next" size={30}></MaterialIcons>
        </View>
      </TouchableWithoutFeedback>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.5,
            height: Dimensions.get('screen').width * 0.5,
            backgroundColor: '#FF646A',
          }}>
          <Fontisto
            name="blood-drop"
            size={60}
            color="#FFFFFF"
            style={{alignSelf: 'flex-end', margin: 10}}></Fontisto>
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              fontSize: 60,
              fontWeight: 'bold',
            }}>
            {waterConsumed} Ltrs
          </Text>
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Water Consumed
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.5,
            height: Dimensions.get('screen').width * 0.5,
            backgroundColor: '#00DDFF',
          }}>
          <FontAwesome5
            name="globe-americas"
            size={60}
            style={{margin: 10}}
            color="white"></FontAwesome5>
          <Text
            style={{
              color: 'white',
              marginRight: 10,
              fontSize: 60,
              fontWeight: 'bold',
              alignSelf: 'flex-end',
            }}>
            ${moneyDonated.toFixed(2)}
          </Text>
          <Text
            style={{
              color: 'white',
              marginRight: 10,
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'flex-end',
            }}>
            Donated
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.7,
            height: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#FF64AC',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text style={{color: 'white', fontSize: 90, fontWeight: 'bold'}}>
              {bottleSaved}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                width: '30%',
                fontWeight: 'bold',
              }}>
              Bottles Saved
            </Text>
            <MaterialCommunityIcons
              name="bottle-wine"
              size={80}
              color="white"></MaterialCommunityIcons>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.3,
            height: Dimensions.get('screen').width * 0.3,
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo
            name="wallet"
            color="white"
            size={80}
            onPress={() => {
              navigation.navigate('Wallet');
            }}></Entypo>
        </View>
      </View>
      <ScrollView style = {{marginVertical: 30}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {banners.map((banner) => {
          return (
            <CampaignBannerComponent
              key={banner.key}
              url={banner.url}></CampaignBannerComponent>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  dropsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 5,
  },
  dropText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  mapContainer: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#FF646A',
  },

  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});
