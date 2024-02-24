import {Redirect, Stack} from 'expo-router';

import useUserContext from '../../hooks/UserHook';

const Layout = () => {
  const {user} = useUserContext();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen
        name="single"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myfiles"
        options={{presentation: 'modal', title: 'My Files'}}
      />
      <Stack.Screen
        name="update"
        options={{presentation: 'modal', title: 'Modify'}}
      />
    </Stack>
  );
};

export default Layout;
