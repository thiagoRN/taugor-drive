import {View, Text, Image} from 'react-native';
import React from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import FullRoundButtonComp from '../../components/FullRoundButtonComp';
import {_signInWithGoogle} from '../../config/firebase/GoogleSignIn';
import {toastMessage} from '../../config/AppTost';
import {axiosClient, SIGN_IN} from '../../config/api';
import {_storeIntoAsyncStorage} from '../../config/asyncStorage';
import InputFieldComp from '../../components/InputFieldComp';
import auth from '@react-native-firebase/auth';

export default function SiginInScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setLoading(false);
  }, []);

  async function googleSignIn() {
    _signInWithGoogle().then(data => {
      if (!data) {
        console.log('=>Error:', 'No Data');
        return;
      }
      _sign_in_api(data);
    });
  }

  async function _sign_in_api(googleData) {
    setLoading(true);
    const apiParams = {
      loginSource: 'google',
      sid: googleData.user.id,
      name: googleData.user.name,
      email: googleData.user.email,
      profileImage: googleData.user.photo,
      fcmToken: 'fcm_110220',
    };
    const {data, status} = await axiosClient.post(SIGN_IN, apiParams);
    setLoading(false);
    console.log(data);
    if (status == 200) {
      if (data.status === '200') {
        console.log('=> Success: ', data);
        toastMessage('success', data.message);
        _storeIntoAsyncStorage('user', JSON.stringify(data));
        navigation.navigate('Home');
      } else {
        toastMessage('error', data.message);
      }
    } else {
      toastMessage('error', 'Error in Sign In API');
    }
  }

  const signin = () => {
    console.log(email);
    console.log(password);
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(auth().currentUser.uid);
        console.log('logou');
        navigation.navigate('Home');
      })
      .catch(err => alert(err.code, err.message));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/logo2.png')}
          style={{height: 200, width: 200, objectFit: 'scale-down'}}
        />

        <Text
          style={{
            textAlign: 'center',
          }}>
          Bem vindo ao Taugor Drive
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#efefef', marginTop: 60}}>
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <View style={{marginRight: 5}}>
            <RoundButtonComp
              label={'Login'}
              width={120}
              onPress={() => signin()}
            />
          </View>
          <RoundButtonComp
            label={'Sign Up'}
            border={true}
            width={150}
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 20,
            paddingBottom: 20,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}>
            Ou faça login pelo Google
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <FullRoundButtonComp
              image={require('../../assets/google.png')}
              bg={'#e54545'}
              onPress={() => googleSignIn()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
