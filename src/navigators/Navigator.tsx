import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useUserContext} from '../hooks/ContextHooks';
import Home from '../views/Home';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabscreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
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
