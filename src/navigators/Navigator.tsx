import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon, Badge} from '@rneui/base';

import useUpdateContext from '../hooks/UpdateHook';
import useUserContext from '../hooks/UserHook';
import useSocket from '../hooks/socketHooks';
import Home from '../views/Home';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Update from '../views/Update';
import Upload from '../views/Upload';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabscreen = () => {
  const {isConnected} = useSocket();
  const {newItems} = useUpdateContext();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <View style={{padding: 8}}>
              {newItems && <Icon name="refresh" />}
              <Badge status={isConnected ? 'success' : 'error'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="upload" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stackscreen = () => {
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={Tabscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="My Files" component={MyFiles} />
          <Stack.Screen name="Update" component={Update} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stackscreen />
    </NavigationContainer>
  );
};

export default Navigator;
