import {Slot} from 'expo-router';

import {MediaProvider} from '../contexts/MediaContext';
import {UpdateProvider} from '../contexts/UpdateContext';
import {UserProvider} from '../contexts/UserContext';

const Layout = () => {
  return (
    <UserProvider>
      <UpdateProvider>
        <MediaProvider>
          <Slot />
        </MediaProvider>
      </UpdateProvider>
    </UserProvider>
  );
};

export default Layout;
