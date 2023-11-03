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
      toastMessage('error', 'Please provide a valid email');
      return;
    }
    if (!password) {
      toastMessage('error', 'Please provide password');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        const {uid} = data.user;
        toastMessage('error', 'Registrado');
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
    <View style={{flex: 1, backgroundColor: '#efefef', padding: 15}}>
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            width: 150,
            height: 130,
          }}
          resizeMode={'cover'}
          source={require('../../assets/logo2.png')}
        />
      </View>
      <View style={{flex: 0.5, backgroundColor: '#efefef'}}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 60,
          }}>
          Sing Up
        </Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <InputFieldComp
            placeholder={'email'}
            keyboardType={'email-address'}
            onChangeText={text => setEmail(text)}
          />
          <InputFieldComp
            placeholder={'password'}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <RoundButtonComp label={'SignUp'} onPress={() => signUp()} />
        </View>
      </View>
    </View>
  );
}
