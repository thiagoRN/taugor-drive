import React from 'react';
import {Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, height: '100%', width: '100%'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <RoundButtonComp
          label={'Sair'}
          width={150}
          onPress={() => auth().signOut().then(navigation.navigate('SiginIn'))}
        />
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Bem vindo
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {auth().currentUser !== null ? auth().currentUser.email : 'user'}
        </Text>
      </View>

      
    </SafeAreaView>
  );
}
