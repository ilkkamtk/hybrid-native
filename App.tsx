import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
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
