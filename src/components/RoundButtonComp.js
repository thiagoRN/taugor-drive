import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RoundButtonComp({
  label,
  border = false,
  onPress,
  width = '100%',
  marginTop = 0,
}) {
  return (
    <TouchableOpacity style={{marginTop: marginTop}} onPress={() => onPress()}>
      <View
        style={{
          backgroundColor: border ? 'white' : '#79c108',
          width: width,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 15,
          borderColor: 'white',
          borderWidth: border ? 1 : 0,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}>
        <Text
          style={{
            color: border ? 'black' : 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 24,
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
