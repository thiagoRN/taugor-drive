import {View, Text, StatusBar, Image, Alert} from 'react-native';
import React from 'react';
import InputFieldComp from '../../components/InputFieldComp';
import RoundButtonComp from '../../components/RoundButtonComp';
import {toastMessage} from '../../config/AppTost';
import auth from '@react-native-firebase/auth';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  async function signUp() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(email) === false) {
      toastMessage('error', 'Por favor forneça um email válido');
      return;
    }
    if (!password) {
      toastMessage('error', 'Por favor forneça uma senha');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        const {uid} = data.user;
        toastMessage('error', 'Registrado');
        navigation.navigate('SiginIn');
        return uid;
      })
      .catch(error => {
        console.log(error.message);
        Alert.alert('Error', error.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }

  return (
    <View style={{flex: 1, backgroundColor: '#efefef', padding: 10}}>
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            width: 340,
            height: 100,
            objectFit: 'scale-down',
            marginTop: 5,
          }}
          source={require('../../assets/logo4.png')}
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#efefef'}}>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 10,
              marginBottom: 10,
            }}>
            Criar Conta
          </Text>
          <InputFieldComp
            placeholder={'email'}
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
          />
          <InputFieldComp
            placeholder={'senha'}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <RoundButtonComp label={'Criar'} onPress={() => signUp()} />
        </View>
      </View>
    </View>
  );
}
