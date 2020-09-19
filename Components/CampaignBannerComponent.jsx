import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';

export default function CampaignBannerComponent(props) {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width * 0.4,
        height: Dimensions.get('screen').width * 0.4,
        marginHorizontal: 10,
      }}>
      <Image
        source={{
          uri: props.url,
        }}
        resizeMode="stretch"
        style={{
          width: Dimensions.get('screen').width * 0.4,
          height: Dimensions.get('screen').width * 0.4,
        }}></Image>
    </View>
  );
}
