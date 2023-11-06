import HomeScreen from '../Home/index';
import UploadScreen from '../Upload/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => {
            if (focused) {
              return <Icon size={size} color={'#79c108'} name="home" />;
            }
            return <Icon size={size} color={'#8f8f8f'} name="home" />;
          },
        }}
      />
      <Tab.Screen
        name="upload"
        component={UploadScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => {
            if (focused) {
              return <Icon size={size} color={'#79c108'} name="folder-open" />;
            }
            return <Icon size={size} color={'#8f8f8f'} name="folder" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
