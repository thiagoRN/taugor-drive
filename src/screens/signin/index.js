import {View, Text, Image} from 'react-native';
import React from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import FullRoundButtonComp from '../../components/FullRoundButtonComp';
import {_signInWithGoogle} from '../../config/firebase/GoogleSignIn';
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
        navigation.navigate('Home');
        return;
      }
      // _sign_in_api(data);
    });
  }

  const signin = () => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
        setLoading(true);
      })
      .catch(err => alert('Login ou senha incorretas'));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../../assets/logo2.png')}
          style={{height: 150, width: 150, objectFit: 'scale-down'}}
        />

        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#000000',
          }}>
          Bem vindo ao Taugor Drive
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <InputFieldComp
          placeholder={'Email'}
          keyboardType={'email-address'}
          onChangeText={text => setEmail(text)}
        />
        <InputFieldComp
          placeholder={'Senha'}
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
            onPress={() => navigation.navigate('SignUp')}
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
              fontSize: 20,
              color: '#000000',
            }}>
            Faça login pelo Google
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
