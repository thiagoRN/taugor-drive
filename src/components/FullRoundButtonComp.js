import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FullRoundButtonComp({image, bg, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={{
          backgroundColor: bg,
          width: 155,
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          marginLeft: 10,
        }}>
        <Image source={image} style={{width: 20, height: 20}} />
      </View>
    </TouchableOpacity>
  );
}
