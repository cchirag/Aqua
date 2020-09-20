import React, {PureComponent, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import stripe from 'tipsi-stripe';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Fontisto from 'react-native-vector-icons/Fontisto';

stripe.setOptions({
  publishableKey:
    'pk_test_51H6jpPI6dlHBa6hZYjKUwxur7vfoY1fEGK3kKsV64aCyCUK1e3gPTa2hRG7CEhcxl2KPy2mJSTfsbc8nq8tMoW9n00pWpsGAQ6',
});

export default function WalletScreen() {
  const [drops, setDrops] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(() => {
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .onSnapshot((snapShot) => {
              if (isMounted) {
                setDrops(snapShot.data().walletBalance);
              }
            });
        });
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handlePay() {
    try {
      setToken(null);
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: auth().currentUser.displayName,
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleConfirm() {
    axios({
      method: 'POST',
      url:
        'https://us-central1-aqua-6b78b.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: quantity,
        currency: 'usd',
        token: token,
        name: auth().currentUser.displayName,
      },
    })
      .then(async (response) => {
        await firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get()
          .then(async (res) => {
            let finalBalance = res.data().walletBalance + response.data.amount;
            await firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .update({
                walletBalance: finalBalance,
              });
          });
        setToken(null);
      })
      .finally(() => {
        setToken(null);
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>
        Buy Drops
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '90%',
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '25%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 60, fontWeight: 'bold'}}>{drops}</Text>
            <Fontisto name="blood-drop" size={80} color="#00DDFF"></Fontisto>
          </View>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginVertical: 20}}>
            drops in Wallet
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '90%',
            }}>
            <Button
              title="Add 1 More"
              color="#FF646A"
              disabled = {token ? true : false}
              onPress={() => {
                setQuantity(1);
                handlePay();
              }}></Button>
            <Button
              title="Add 5 More"
              color="#FF646A"
              disabled = {token ? true : false}
              onPress={() => {
                setQuantity(5);
                handlePay();
              }}></Button>
            <Button
              title="Add 10 More"
              color="#FF646A"
              disabled = {token ? true : false}
              onPress={() => {
                setQuantity(10);
                handlePay();
              }}></Button>
          </View>
          {token && (
            <>
              <Text></Text>
              <Button title="Confirm ?" onPress={handleConfirm}></Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
