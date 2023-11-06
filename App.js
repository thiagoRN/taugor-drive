import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SiginInScreen from './src/screens/Signin';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import WelcomeScreen from './src/screens/Welcome';
import AppNavigation from './src/screens/Navigation';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name={'welcome'}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'SiginIn'}
            component={SiginInScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'SignUp'}
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'Home'}
            component={AppNavigation}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
