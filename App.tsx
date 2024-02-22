import {StatusBar} from 'expo-status-bar';

import {UpdateProvider} from './src/contexts/UpdateContext';
import {UserProvider} from './src/contexts/UserContext';
import Navigator from './src/navigators/Navigator';

const App = () => {
  return (
    <UserProvider>
      <UpdateProvider>
        <Navigator></Navigator>
        <StatusBar style="auto" />
      </UpdateProvider>
    </UserProvider>
  );
};

export default App;
