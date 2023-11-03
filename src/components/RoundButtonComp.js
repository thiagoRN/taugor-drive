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
          borderColor: 'black',
          borderWidth: border ? 1 : 0,
          height:50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: border ? 'black' : 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// height: 50,
//                 width: 150,
//                 backgroundColor: '#79c108',
//                 color: '#efefef',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 15,
//                 fontWeight: 'bold',