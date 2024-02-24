import {Slot} from 'expo-router';

import {UpdateProvider} from '../contexts/UpdateContext';
import {UserProvider} from '../contexts/UserContext';

const Layout = () => {
  return (
    <UserProvider>
      <UpdateProvider>
        <Slot />
      </UpdateProvider>
    </UserProvider>
  );
};

export default Layout;
