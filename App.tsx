import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';

import {UpdateProvider} from './src/contexts/UpdateContext';
import {UserProvider} from './src/contexts/UserContext';
import Home from './src/views/Home';

const App = () => {
  return (
    <UserProvider>
      <UpdateProvider>
        <SafeAreaView style={styles.container}>
          <Home />
          <StatusBar style="auto" />
        </SafeAreaView>
      </UpdateProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
