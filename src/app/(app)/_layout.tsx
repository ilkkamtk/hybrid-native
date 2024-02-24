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
      <Stack.Screen name="single" options={{presentation: 'modal'}} />
      <Stack.Screen name="myFiles" />
      <Stack.Screen name="update" />
    </Stack>
  );
};

export default Layout;
