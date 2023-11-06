/* eslint-disable no-undef */
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';

export default function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#79c108'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#e0d8d5',
          justifyContent: 'center',
          color: '#00000',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000000',
              textAlign: 'left',
              fontSize: 30,
              fontWeight: 'bold',
              marginBottom: 15,
              padding: 10,
              zIndex: 99999,
              color: '#fff',
            }}>
            Solução intuitiva e eficiente para armazenar e gerenciar arquivos
          </Text>
          <View
            style={{
              height: '60%',
              width: 320,
              objectFit: 'scale-down',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../assets/img.png')}
              style={{height: 700, width: 400, objectFit: 'cover'}}
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <RoundButtonComp
              label={'Criar conta'}
              border={true}
              width={150}
              onPress={() => navigation.navigate('SignUp')}
            />

            <RoundButtonComp
              label={'Entrar'}
              width={150}
              onPress={() => navigation.navigate('SiginIn')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
