import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import {View, Text, KeyboardAvoidingView, Image} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Logo from '../assets/images/Logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          await auth()
            .currentUser.updateProfile({
              displayName: displayName,
              photoURL: 'https://image.flaticon.com/icons/png/512/21/21294.png',
            })
            .then((some) => {
              console.log(some);
              firestore().collection('users').doc(res.user.uid).set({
                name: auth().currentUser.displayName,
                email: res.user.email,
                profileImage:
                  'https://image.flaticon.com/icons/png/512/21/21294.png',
                uid: res.user.uid,
                moneySaved: 0,
                moneyDonated: 0,
                walletBalance: 0,
                waterConsumed: 0,
                bottleSaved: 0,
              });
            })
            .catch((err) => Alert.alert('Error', err.message))
            .finally(() => setLoading(false));
        });
    } else {
      Alert.alert('Alert', 'Please make sure your passwords match.');
    }
  };
  return (
    <KeyboardAvoidingView style={Styles.outerContainer} behavior="height">
      <ScrollView style={{width: '100%'}}>
        <View style={Styles.innerContainer}>
          <View>
            <Image
              source={Logo}
              style={Styles.logo}
              resizeMode="contain"></Image>
          </View>
          <View>
            <TextInput
              style={Styles.formTextInput}
              placeholder="Display Name"
              value={displayName}
              onChangeText={(e) => setDisplayName(e)}></TextInput>
            <TextInput
              style={Styles.formTextInput}
              placeholder="Email"
              value={email}
              onChangeText={(e) => setEmail(e)}></TextInput>
            <TextInput
              style={Styles.formTextInput}
              placeholder="Password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={true}></TextInput>
            <TextInput
              style={Styles.formTextInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
              secureTextEntry={true}></TextInput>
            <TouchableWithoutFeedback
              style={Styles.signInButton}
              disabled={loading}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator color="white"></ActivityIndicator>
              ) : (
                <Text style={Styles.signInButtonText}>Sign In</Text>
              )}
            </TouchableWithoutFeedback>
          </View>
          <Text style={{color: 'white', fontSize: 15}}>or</Text>
          <View style={Styles.socialContainer}>
            <Entypo
              name="facebook-with-circle"
              color="white"
              size={50}></Entypo>
            <FontAwesome
              name="google-plus-circle"
              color="white"
              size={50}></FontAwesome>
            <Entypo name="twitter-with-circle" color="white" size={50}></Entypo>
          </View>
          <Text style={{color: '#FF646A', fontSize: 15}}>
            Already have an account?
            <Text
              style={{color: 'white'}}
              onPress={() => navigation.navigate('SignIn Screen')}>
              {' '}
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 100,
    height: 100,
  },
  formTextInput: {
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 50,
    marginVertical: 10,
    paddingLeft: 20,
  },

  signInButtonText: {
    color: 'white',
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.5,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'white',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    width: Dimensions.get('screen').width * 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  innerContainer: {
    height: '80%',
    alignItems: 'center',
    marginVertical: '20%',
    justifyContent: 'space-evenly',
  },
});
