import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ffff',
          marginTop: 36,
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          Bem vindo
        </Text>

        <TouchableOpacity
          onPress={() => auth().signOut().then(navigation.navigate('SiginIn'))}
          style={styles.button}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              alignItems: 'center',
              marginLeft: 10,
            }}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Upload')}
          style={{
            marginTop: '100%',
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#79c108',
            height: 50,
            width: 150,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              alignItems: 'center',
              marginLeft: 10,
            }}>
            UploadPage
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0d8d5',
    height: '100%',
    width: '100%',
  },
  view: {
    flex: 1,
    height: 500,
    width: 360,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#79c108',
    borderRadius: 5,
  },
});
