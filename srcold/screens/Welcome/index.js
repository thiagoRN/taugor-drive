/* eslint-disable no-undef */
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {_getFromAsyncStorage} from '../../config/asyncStorage';

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
              width: 360,
              objectFit: 'scale-down',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../assets/img.png')}
              style={{height: 680, objectFit: 'contain'}}
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 150,
                backgroundColor: '#efefef',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 15,
              }}>
              <Text
                onPress={() => navigation.navigate('SignUpScreen')}
                style={{fontWeight: 'bold', fontSize: 20, color: '#79c108'}}>
                Criar conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: 150,
                backgroundColor: '#79c108',
                alignItems: 'center',
                color: '#efefef',
                justifyContent: 'center',
                borderRadius: 15,
                fontWeight: 'bold',
              }}>
              <Text
                onPress={() => navigation.navigate('SiginIn')}
                style={{fontWeight: 'bold', fontSize: 20, color: '#e0d8d5'}}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
